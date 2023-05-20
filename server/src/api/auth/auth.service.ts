import bcrypt from 'bcrypt'
import BadRequestError from '../../errors/BadRequestError.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'
import AccountModel from '../../mongodb/models/account.model.js'
import authModel, { Credentials } from '../../mongodb/models/auth.model.js'
import logger from '../../service/logger.service.js'
import { TokenPayload, tokenService } from '../../service/token.service.js'
import { userService } from '../account/account.service.js'

const registration = async (authUser: Credentials) => {
  // check if email is already taken
  const isEmailExist = await isEmailTaken(authUser.email)
  if (isEmailExist) {
    logger.warn(
      `auth.service - attempt to create new account with existing email: ${authUser.email}`
    )
    throw new BadRequestError('Email already taken', authUser.email)
  }

  // hash password
  const hashPassword = await bcrypt.hash(authUser.password, 10)
  authUser.password = hashPassword

  // create new authentication
  const auth = await authModel.create(authUser)
  logger.info(`auth.service - new account created: ${auth.email}`)

  // create new user
  const user = await userService.addUser(auth.email)

  //create new account
  const account = await AccountModel.create({ user: user._id })

  // generate tokens
  const { accessToken, refreshToken } = tokenService.generateTokens({
    // email: auth.email,
    user: user.identifier,
  })

  // save refresh token to db
  await tokenService.saveToken(auth._id, refreshToken)

  return { accessToken, refreshToken, user: auth.email }
}

const signIn = async (credentials: Credentials) => {
  const { email, password } = credentials

  // check if email exists
  const account = await authModel.findOne({ email }).select('+password')
  if (!account) {
    logger.warn(`auth.service - attempt to sign in with wrong email: ${email}`)
    throw new BadRequestError('Invalid credentials', email)
  }

  // check if password is valid
  const isPasswordValid = await bcrypt.compare(password, account.password)
  if (!isPasswordValid) {
    logger.warn(
      `auth.service - attempt to sign in with wrong password: ${email}`
    )
    throw new BadRequestError('Invalid credentials', email)
  }

  // get user
  const user = await userService.getUser(email)
  if (!user) {
    logger.warn(`auth.service - user is missing: ${email}`)
    throw new BadRequestError('User is not found', email)
  }

  // generate tokens
  const { accessToken, refreshToken } = tokenService.generateTokens({
    user: user.identifier,
  })

  // save refresh token to db
  await tokenService.saveToken(account._id, refreshToken)

  logger.info(`auth.service - user signed in: ${email}`)

  return { accessToken, refreshToken, user: { email: account.email } }
}

const signOut = async (refreshToken: string) => {
  const token = await tokenService.removeToken(refreshToken)

  logger.info(`auth.service - user signed out`)

  return token
}

const refresh = async (refreshToken: string) => {
  if (!refreshToken) throw new UnauthorizedError('Refresh token is required')

  const userData = await tokenService.validateRefreshToken(refreshToken)
  const tokenFromDb = await tokenService.findToken(refreshToken)

  if (!userData || !tokenFromDb) {
    throw new UnauthorizedError('Invalid refresh token')
  }

  // check if user exists
  const { user } = userData as TokenPayload
  const auth = await authModel.findOne({ mail: user })
  if (!auth) {
    throw new UnauthorizedError('User not found')
  }

  // get user
  const account = await userService.getUser(auth.email)
  if (!account) {
    logger.warn(`auth.service - user is missing: ${auth.email}`)
    throw new BadRequestError('User is not found', auth.email)
  }

  // generate tokens
  const tokens = tokenService.generateTokens({
    user: account.identifier,
  })

  // save refresh token to db
  await tokenService.saveToken(account._id, tokens.refreshToken)

  return { ...tokens, user: account.identifier }
}

const getAllAccounts = async () => {
  const accounts = await authModel.find()

  logger.info(`auth.service - user fetched all accounts`)

  return accounts
}

export const authService = {
  registration,
  signIn,
  signOut,
  refresh,
  getAllAccounts,
}

const isEmailTaken = async (email: String) => {
  try {
    const existingAuthUser = await authModel.findOne({ email })
    return existingAuthUser ? true : false
  } catch (error) {
    throw error
  }
}

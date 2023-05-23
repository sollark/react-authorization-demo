import bcrypt from 'bcrypt'
import BadRequestError from '../../errors/BadRequestError.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'
import accountModel from '../../mongodb/models/account.model.js'
import authModel, { Credentials } from '../../mongodb/models/auth.model.js'
import logger from '../../service/logger.service.js'
import { TokenPayload, tokenService } from '../../service/token.service.js'
import { userService } from '../../service/user.service.js'

const registration = async (credentials: Credentials) => {
  // check if email is already taken
  const isEmailExist = await isEmailTaken(credentials.email)
  if (isEmailExist) {
    logger.warn(
      `auth.service - attempt to create new authentication with existing email: ${credentials.email}`
    )
    throw new BadRequestError('Email already taken', credentials.email)
  }

  // hash password
  const hashPassword = await bcrypt.hash(credentials.password, 10)
  credentials.password = hashPassword

  // create new authentication
  const auth = await authModel.create(credentials)
  logger.info(`auth.service - new authentication created: ${auth.email}`)

  // id for user and account schemas
  const identifier = auth._id

  // create new user
  const user = await userService.addUser(identifier)
  const userId = await userService.getUserId(identifier)

  //create new account
  const account = await accountModel.create({ user: userId })

  // generate tokens
  const { accessToken, refreshToken } = tokenService.generateTokens({
    email: credentials.email,
  })

  // save refresh token to db
  await tokenService.saveToken(auth._id, refreshToken)

  return { accessToken, refreshToken, user: auth.email }
}

const signIn = async (credentials: Credentials) => {
  const { email, password } = credentials

  // check if email exists
  const auth = await authModel.findOne({ email }).select('+password')
  if (!auth) {
    logger.warn(`auth.service - attempt to sign in with wrong email: ${email}`)
    throw new BadRequestError('Invalid credentials', email)
  }

  // check if password is valid
  const isPasswordValid = await bcrypt.compare(password, auth.password)
  if (!isPasswordValid) {
    logger.warn(
      `auth.service - attempt to sign in with wrong password: ${email}`
    )
    throw new BadRequestError('Invalid credentials', email)
  }

  // generate tokens
  const { accessToken, refreshToken } = tokenService.generateTokens({
    email,
  })

  // save refresh token to db
  await tokenService.saveToken(auth._id, refreshToken)

  logger.info(`auth.service - user signed in: ${email}`)

  return { accessToken, refreshToken, user: { email: auth.email } }
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
  const { email } = userData as TokenPayload
  const auth = await authModel.findOne({ email })
  if (!auth) {
    throw new UnauthorizedError('User not found')
  }

  // get user
  const user = await userService.getUser(auth._id)
  if (!user) {
    logger.warn(`auth.service - user is missing: ${auth.email}`)
    throw new BadRequestError('User is not found', auth.email)
  }

  // generate tokens
  const tokens = tokenService.generateTokens({
    email,
  })

  // save refresh token to db
  await tokenService.saveToken(auth._id, tokens.refreshToken)

  return { ...tokens, email }
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

import bcrypt from 'bcrypt'
import BadRequestError from '../../errors/BadRequestError.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'
import authModel, { Credentials } from '../../mongodb/models/auth.model.js'
import logger from '../../service/logger.service.js'
import { payloadService } from '../../service/payload.service.js'
import { tokenService } from '../../service/token.service.js'
import { userService } from '../../service/user.service.js'
import { accountService } from '../account/account.service.js'

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

  // identifier for user and account schemas
  // hashIdentifier for tokens
  const identifier = auth._id

  // create new user
  const user = await userService.addUser(identifier)
  logger.info(`auth.service - new user created: ${user}`)
  const userId = await userService.getUserId(identifier)

  //create new account
  const account = await accountService.addAccount(identifier, userId)

  // generate tokens
  const payload: string = payloadService.generateTokenPayload([])
  const { accessToken, refreshToken } = tokenService.generateTokens({ payload })

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

  const hashIdentifier = await bcrypt.hash(auth._id.toString(), 5)

  // generate tokens
  const { accessToken, refreshToken } = tokenService.generateTokens({
    id: hashIdentifier,
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
  // This is hash!!!!
  const { id } = userData

  const auth = await authModel.findById(id)

  if (!auth) {
    throw new UnauthorizedError('User not found')
  }

  // get user
  const user = await userService.getUserByIdentifier(auth._id)
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

import bcrypt from 'bcrypt'
import BadRequestError from '../../errors/BadRequestError.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'
import authModel, { Credentials } from '../../mongodb/models/auth.model.js'
import TokenModel from '../../mongodb/models/token.model.js'
import logger from '../../service/logger.service.js'
import { payloadService } from '../../service/payload.service.js'
import { tokenService } from '../../service/token.service.js'
import { userService } from '../../service/user.service.js'
import { accountService } from '../account/account.service.js'

async function registration(credentials: Credentials) {
  const { email, password } = credentials

  const isTaken = await isEmailTaken(email)
  if (isTaken) {
    logger.warn(
      `auth.service - attempt to create new authentication with existing email: ${email}`
    )
    throw new BadRequestError('Email already taken', email)
  }

  // hash password
  const hashPassword = await bcrypt.hash(password, 10)

  // create new authentication
  const auth = await authModel.create({ email, password: hashPassword })
  logger.info(`auth.service - new authentication created: ${email}`)

  // // generate tokens
  const { accessToken, refreshToken } = await generateTokens(auth.uuid)

  // save refresh token to db
  await tokenService.saveToken(auth._id, refreshToken)

  //create new user and account
  const user = await userService.createUser(auth._id)
  const account = await accountService.createAccount(auth._id, user._id)

  return { accessToken, refreshToken }
}

const signIn = async (credentials: Credentials) => {
  const { email, password } = credentials

  // check if email exists
  const auth = await authModel.findOne({ email }).select('+password')
  if (!auth) {
    logger.warn(`auth.service - attempt to sign in with wrong email: ${email}`)
    throw new UnauthorizedError('Invalid credentials', email)
  }

  // check if password is valid
  const isPasswordValid = await bcrypt.compare(password, auth.password)
  if (!isPasswordValid) {
    logger.warn(
      `auth.service - attempt to sign in with wrong password: ${email}`
    )
    throw new UnauthorizedError('Invalid credentials', email)
  }

  // generate tokens
  const { accessToken, refreshToken } = await generateTokens(auth.uuid)

  // save refresh token with identifier to db
  await tokenService.saveToken(auth._id, refreshToken)

  logger.info(`auth.service - user signed in: ${email}`)

  return { accessToken, refreshToken }
}

const signOut = async (refreshToken: string) => {
  const result = await tokenService.removeToken(refreshToken)

  logger.info(`auth.service - user signed out`, result)

  return result
}

const refresh = async (refreshToken: string) => {
  if (!refreshToken) throw new UnauthorizedError('Refresh token is required')

  const payload = await tokenService.validateRefreshToken(refreshToken)
  const tokenFromDb = await tokenService.getToken(refreshToken)

  if (!payload || !tokenFromDb) {
    throw new UnauthorizedError('Invalid refresh token')
  }

  // find user
  const tokenData = await TokenModel.findOne({ refreshToken })
    .select('identifier')
    .lean()
    .exec()

  if (!tokenData) throw new UnauthorizedError('Invalid refresh token')

  // generate tokens
  const tokens = tokenService.generateTokens(payload as string)

  // save refresh token to db
  await tokenService.saveToken(tokenData.identifier, tokens.refreshToken)

  return { ...tokens }
}

const getAccess = async (refreshToken: string) => {
  if (!refreshToken) return

  const payload = await tokenService.validateRefreshToken(refreshToken)
  const tokenFromDb = await tokenService.getToken(refreshToken)

  if (!payload || !tokenFromDb) {
    return
  }

  // find user
  const tokenData = await TokenModel.findOne({ refreshToken })
    .select('identifier')
    .lean()
    .exec()

  if (!tokenData) return

  // generate tokens
  const tokens = tokenService.generateTokens(payload as string)

  // save refresh token to db
  await tokenService.saveToken(tokenData.identifier, tokens.refreshToken)

  return { ...tokens }
}

export const authService = {
  registration,
  signIn,
  signOut,
  refresh,
  getAccess,
}

const isEmailTaken = async (email: string) => {
  try {
    const existingAuthUser = await authModel.findOne({ email })
    return existingAuthUser ? true : false
  } catch (error) {
    throw error
  }
}

async function generateTokens(uuid: string) {
  const payload: string = await payloadService.generateTokenPayload(uuid)

  return tokenService.generateTokens(payload)
}

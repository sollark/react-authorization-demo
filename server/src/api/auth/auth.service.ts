import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import BadRequestError from '../../errors/BadRequestError.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'
import authModel, { Credentials } from '../../mongodb/models/auth.model.js'
import TokenModel from '../../mongodb/models/token.model.js'
import logger from '../../service/logger.service.js'
import { tokenService } from '../../service/token.service.js'
import { accountService } from '../account/account.service.js'
import { profileService } from '../profile/profile.service.js'

async function registration(credentials: Credentials) {
  const { email, password } = credentials

  // hash password
  const hashPassword = await bcrypt.hash(password, 10)

  // create new authentication
  const uuid = uuidv4()
  const auth = await authModel.create({ uuid, email, password: hashPassword })
  logger.info(`authService - New authentication created for email: ${email}`)

  // generate tokens
  const { accessToken, refreshToken } = await generateTokens(auth.uuid)

  // save refresh token to db
  await tokenService.saveToken(auth._id, refreshToken)

  // create new profile and new account
  const profile = await profileService.createBlankProfile()
  if (!profile) throw new BadRequestError('Could not create profile')
  const account = await accountService.createAccount(auth._id, profile._id)
  if (!account) throw new BadRequestError('Could not create account')

  return { accessToken, refreshToken }
}

const signIn = async (credentials: Credentials) => {
  const { email, password } = credentials

  // check if email exists
  const auth = await authModel
    .findOne({ email })
    .select('+password')
    .lean()
    .exec()
  if (!auth) {
    logger.warn(`authService - attempt to sign in with wrong email: ${email}`)
    throw new UnauthorizedError('Invalid credentials', email)
  }

  // check if password is valid
  const isPasswordValid = await bcrypt.compare(password, auth.password)
  if (!isPasswordValid) {
    logger.warn(
      `authService - attempt to sign in with wrong password: ${email}`
    )
    throw new UnauthorizedError('Invalid credentials', email)
  }

  // generate tokens
  const { accessToken, refreshToken } = await generateTokens(auth.uuid)

  // save refresh token to db
  await tokenService.saveToken(auth._id, refreshToken)

  logger.info(`authService - user signed in: ${email}`)

  return { accessToken, refreshToken }
}

const signOut = async (refreshToken: string) => {
  const result = await tokenService.removeToken(refreshToken)

  logger.info(`authService - user signed out`, result)

  return result
}

const refresh = async (refreshToken: string) => {
  if (!refreshToken) throw new UnauthorizedError('Refresh token is required')

  const payload = await tokenService.validateRefreshToken(refreshToken)
  const tokenFromDb = await tokenService.getToken(refreshToken)

  if (!payload || !tokenFromDb)
    throw new UnauthorizedError('Invalid refresh token')

  // find token
  const tokenData = await TokenModel.findOne({ refreshToken })
    .select('identifier')
    .lean()
    .exec()

  if (!tokenData) throw new UnauthorizedError('Invalid refresh token')

  // generate tokens
  const tokens = tokenService.generateTokens(payload.data)

  // save refresh token to db
  await tokenService.saveToken(tokenData.identifier, tokens.refreshToken)

  return { ...tokens }
}

export async function isEmailExists(email: string) {
  const existingAuthUser = await authModel.findOne({ email })
  return existingAuthUser ? true : false
}

export const authService = {
  registration,
  signIn,
  signOut,
  refresh,
  isEmailExists,
}

async function generateTokens(uuid: string) {
  return tokenService.generateTokens(uuid)
}

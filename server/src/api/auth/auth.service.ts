import bcrypt from 'bcrypt'
import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'
import authModel, { Credentials } from '../../mongodb/models/auth.model.js'
import TokenModel from '../../mongodb/models/token.model.js'
import logger from '../../service/logger.service.js'
import { payloadService } from '../../service/payload.service.js'
import { tokenService } from '../../service/token.service.js'
import { userService } from '../../service/user.service.js'
import { workspaceService } from '../../service/workspace.service.js'
import { accountService } from '../account/account.service.js'

async function registration(credentials: Credentials) {
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

  // // generate token
  const { accessToken, refreshToken } = await getTokens([])

  // save refresh token to db
  await tokenService.saveToken(auth._id, refreshToken)

  //create new user
  const user = await userService.addUser(auth._id)

  //create new account for user
  const account = await accountService.createAccount(auth._id, user._id)

  return { accessToken, refreshToken, account }
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

  // fetch account
  const account = await accountService.getAccount(auth._id)

  // generate tokens
  const workspaceIds = account.workspaces
  const { accessToken, refreshToken } = await getTokens(workspaceIds)

  // save refresh token with identifier to db
  await tokenService.saveToken(auth._id, refreshToken)

  logger.info(`auth.service - user signed in: ${email}`)

  return { accessToken, refreshToken, account }
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

  // fetch account
  const account = await accountService.getAccount(tokenData.identifier)

  // generate tokens
  const tokens = tokenService.generateTokens(payload as string)

  // save refresh token to db
  await tokenService.saveToken(tokenData.identifier, tokens.refreshToken)

  return { ...tokens, account }
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

  // fetch account
  const account = await accountService.getAccount(tokenData.identifier)

  // generate tokens
  const tokens = tokenService.generateTokens(payload as string)

  // save refresh token to db
  await tokenService.saveToken(tokenData.identifier, tokens.refreshToken)

  return { ...tokens, account }
}

export const authService = {
  registration,
  signIn,
  signOut,
  refresh,
  getAccess,
}

const isEmailTaken = async (email: String) => {
  try {
    const existingAuthUser = await authModel.findOne({ email })
    return existingAuthUser ? true : false
  } catch (error) {
    throw error
  }
}

async function getTokens(workspaceIds: Types.ObjectId[]) {
  const workspaces = await workspaceService.getWorkspaces(workspaceIds)
  const payload: string = await payloadService.generateTokenPayload(workspaces)

  return tokenService.generateTokens(payload)
}

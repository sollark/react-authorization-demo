import bcrypt from 'bcrypt'
import BadRequestError from '../../errors/BadRequestError.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'
import authModel, { Credentials } from '../../mongodb/models/auth.model.js'
import TokenModel from '../../mongodb/models/token.model.js'
import UserModel from '../../mongodb/models/user.model.js'
import logger from '../../service/logger.service.js'
import { payloadService } from '../../service/payload.service.js'
import { tokenService } from '../../service/token.service.js'
import { workspaceService } from '../../service/workspace.service.js'
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

  // generate tokens
  const payload: string = payloadService.generateTokenPayload([])
  const { accessToken, refreshToken } = tokenService.generateTokens(payload)

  // save refresh token to db
  await tokenService.saveToken(auth._id, refreshToken)

  return { accessToken, refreshToken }
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

  // fetch user
  // const user = await userService.getUserByIdentifier(auth._id)

  // fetch account
  const account = await accountService.getAccount(auth._id)

  // generate tokens
  const workspaceIds = account.workspaces
  const workspaces =
    workspaceIds && (await workspaceService.getWorkspaces(workspaceIds))

  //TEST
  console.log('TEST: workspaces', workspaces)

  const payload: string = payloadService.generateTokenPayload(workspaces || [])

  const { accessToken, refreshToken } = tokenService.generateTokens(payload)

  // save refresh token with identifier to db
  await tokenService.saveToken(auth._id, refreshToken)

  logger.info(`auth.service - user signed in: ${email}`)

  return { accessToken, account }
}

const signOut = async (refreshToken: string) => {
  const token = await tokenService.removeToken(refreshToken)

  logger.info(`auth.service - user signed out`)

  return token
}

const refresh = async (refreshToken: string) => {
  if (!refreshToken) throw new UnauthorizedError('Refresh token is required')

  const payload = await tokenService.validateRefreshToken(refreshToken)
  const tokenFromDb = await tokenService.getToken(refreshToken)

  if (!payload || !tokenFromDb) {
    throw new UnauthorizedError('Invalid refresh token')
  }

  // find user
  const userId = TokenModel.findOne({ refreshToken: refreshToken }).select(
    'userId'
  )
  // TODO i send account info, not user, fix it
  const user = await UserModel.findById(userId)

  // generate tokens
  const tokens = tokenService.generateTokens(payload as string)

  // save refresh token to db
  await tokenService.saveToken(user!._id, tokens.refreshToken)

  return { ...tokens, user }
}

export const authService = {
  registration,
  signIn,
  signOut,
  refresh,
}

const isEmailTaken = async (email: String) => {
  try {
    const existingAuthUser = await authModel.findOne({ email })
    return existingAuthUser ? true : false
  } catch (error) {
    throw error
  }
}

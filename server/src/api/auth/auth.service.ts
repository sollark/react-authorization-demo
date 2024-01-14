import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import BadRequestError from '../../errors/BadRequestError.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'
import authModel, { Credentials } from '../../mongodb/models/auth.model.js'
import { SessionData, setUuidToALS } from '../../service/als.service.js'
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
  const tokens = await generateTokens(auth.uuid)
  if (!tokens) throw new BadRequestError('Could not generate tokens')

  const { accessToken, refreshToken } = tokens

  // save refresh token to db
  await tokenService.saveToken(uuid, refreshToken)

  // create new profile and new account
  const profile = await profileService.createBlankProfile()
  if (!profile) throw new BadRequestError('Could not create profile')
  const account = await accountService.createAccount(uuid, profile._id)
  if (!account) throw new BadRequestError('Could not create account')

  return { accessToken, refreshToken }
}

async function signIn(email: string, password: string) {
  const result = await authModel.findOne({ email }).select('+password')
  if (!result) return null

  const hashPassword = result.password
  const isPasswordValid = await bcrypt.compare(password, hashPassword)

  if (isPasswordValid) {
    setUuidToALS(result.uuid)
  }
  logger.info(`authService - Sign in successful for email: ${email}`)

  return isPasswordValid ? result.uuid : null
}

async function generateTokens(uuid: string) {
  // get payload info
  const account = await accountService.getAccount(uuid)
  if (!account) return null

  const { employee } = account
  if (!employee) return null

  const { company, employeeNumber } = employee
  if (!company || !employeeNumber) return null

  const { companyNumber } = company
  if (!companyNumber) return null

  const payload: SessionData = {
    userData: { uuid, companyNumber, employeeNumber },
  }

  // generate tokens
  const tokens = tokenService.generateTokens(payload)
  const { refreshToken } = tokens

  // save refresh token to db
  // await tokenService.saveToken(uuid, refreshToken)

  const data: SessionData = {
    userData: { uuid, companyNumber, employeeNumber },
  }
  tokenService.generateTokens(data)

  logger.info(`authService - user signed in: ${uuid}`)

  return tokens
}

const signOut = async (refreshToken: string) => {
  const result = await tokenService.removeToken(refreshToken)

  logger.info(`authService - user signed out`, result)

  return result
}

const refresh = async (refreshToken: string) => {
  if (!refreshToken) throw new UnauthorizedError('Refresh token is required')

  const payload = await tokenService.validateRefreshToken(refreshToken)
  const tokenData = await tokenService.getTokenData(refreshToken)

  if (!payload || !tokenData) return null

  // generate tokens
  const tokens = tokenService.generateTokens(payload.data)

  // save refresh token to db
  await tokenService.saveToken(tokenData.uuid, tokens.refreshToken)

  return { ...tokens }
}

async function isEmailExists(email: string) {
  const existingAuthUser = await authModel.findOne({ email })
  return existingAuthUser ? true : false
}

export const authService = {
  registration,
  signIn,
  generateTokens,
  signOut,
  refresh,
  isEmailExists,
}

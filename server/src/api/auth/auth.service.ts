import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import BadRequestError from '../../errors/BadRequestError.js'
import InternalServerError from '../../errors/InternalServerError.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'
import authModel, { Credentials } from '../../mongodb/models/auth.model.js'
import { SessionData, setUserDataToALS } from '../../service/als.service.js'
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
  await tokenService.saveToken(refreshToken)

  // create new profile and new account
  const profile = await profileService.createBlankProfile()
  if (!profile) throw new BadRequestError('Could not create profile')
  const account = await accountService.createAccount(uuid, profile._id)
  if (!account) throw new BadRequestError('Could not create account')

  return { uuid, accessToken, refreshToken }
}

async function signIn(email: string, password: string) {
  const result = await authModel.findOne({ email }).select('+password')
  if (!result) return null

  const hashPassword = result.password
  const isPasswordValid = await bcrypt.compare(password, hashPassword)

  if (isPasswordValid) {
    setUserDataToALS({ uuid: result.uuid })

    logger.info(
      `authService - Sign in successful for email: ${email}, uuid: ${result.uuid}`
    )
  } else {
    logger.warn(`authService - Sign in failed for email: ${email}`)
  }

  return isPasswordValid ? result.uuid : null
}

async function generateTokens(uuid: string) {
  // get payload info
  const account = await accountService.getAccount(uuid)
  if (!account) return null

  const { employee } = account
  const employeeNumber = employee ? employee.employeeNumber : undefined
  const companyNumber = employee ? employee.company?.companyNumber : undefined

  const payload: SessionData = {
    userData: { uuid, companyNumber, employeeNumber },
  }

  // generate tokens
  const tokens = tokenService.generateTokens(payload)
  const { refreshToken } = tokens

  // save refresh token to db
  await tokenService.saveToken(refreshToken)

  const data: SessionData = {
    userData: { uuid, companyNumber, employeeNumber },
  }
  tokenService.generateTokens(data)

  return tokens
}

async function signOut(refreshToken: string) {
  const result = await tokenService.removeToken(refreshToken)

  logger.info(`authService - signOut, user signed out`)

  return result
}

async function refresh(refreshToken: string) {
  // const uuid = getUuidFromALS()
  const refreshTokenCopy = await tokenService.getRefreshToken(refreshToken)
  if (!refreshTokenCopy) throw new UnauthorizedError('Invalid refresh token')

  const isExpired = await tokenService.isExpired(refreshTokenCopy)
  if (isExpired) throw new UnauthorizedError('Refresh token is expired')

  // generate tokens
  const payload = await tokenService.validateRefreshToken(refreshTokenCopy)
  const sessionData = payload as SessionData
  const uuid = sessionData.userData?.uuid
  console.log('sessiondata and uuid', sessionData, uuid)
  if (!uuid) throw new InternalServerError('Could not get payload')

  const tokens = await generateTokens(uuid)
  if (!tokens) throw new InternalServerError('Could not generate tokens')

  // save refresh token to db
  await tokenService.saveToken(tokens.refreshToken)

  return { ...tokens }
}

async function isEmailExists(email: string) {
  const existingAuthUser = await authModel.findOne({ email })
  if (!existingAuthUser)
    logger.warn(`authService - email does not exist: ${email}`)

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

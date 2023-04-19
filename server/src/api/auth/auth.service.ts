import bcrypt from 'bcrypt'
import authModel, { ICredentials } from '../../mongodb/models/auth.model.js'
import { ITokenPayload, tokenService } from '../../service/token.service.js'
import BadRequestError from '../../errors/BadRequestError.js'
import UnauthorizedError from '../../errors/UnauthorizedError.js'

const registration = async (authUser: ICredentials) => {
  // check if email is already taken
  const isEmailTaken = await _isEmailTaken(authUser.email)
  if (isEmailTaken) {
    // logger.info(`auth.service - attempt to create new account with existing email: ${authUser.email}`)
    throw new BadRequestError('Email already taken', authUser.email)
  }

  // hash password
  const hashPassword = await bcrypt.hash(authUser.password, 10)
  authUser.password = hashPassword

  // create new account
  const account = await authModel.create(authUser)
  // logger.info(`auth.service - new account created: ${account.email}`)

  // generate tokens
  const { accessToken, refreshToken } = tokenService.generateTokens({
    email: account.email,
  })

  // save refresh token to db
  await tokenService.saveToken(account._id, refreshToken)

  return { accessToken, refreshToken, user: account.email }
}

const signIn = async (credentials: ICredentials) => {
  const { email, password } = credentials

  // check if email exists
  const account = await authModel.findOne({ email }).select('+password')
  if (!account) {
    // logger.warning(`auth.service - attempt to sign in with wrong email: ${email}`)
    throw new BadRequestError('Invalid credentials', email)
  }

  // check if password is valid
  const isPasswordValid = await bcrypt.compare(password, account.password)
  if (!isPasswordValid) {
    // logger.warning(`auth.service - attempt to sign in with wrong password: ${email}`)
    throw new BadRequestError('Invalid credentials', email)
  }

  // generate tokens
  const { accessToken, refreshToken } = tokenService.generateTokens({
    email: account.email,
  })

  // save refresh token to db
  await tokenService.saveToken(account._id, refreshToken)

  return { accessToken, refreshToken, user: { email: account.email } }
}

const signOut = async (refreshToken: string) => {
  const token = await tokenService.removeToken(refreshToken)

  return token
}

const refresh = async (refreshToken: string) => {
  if (!refreshToken) throw new UnauthorizedError('Refresh token is required')

  const userData = await tokenService.validateRefreshToken(refreshToken)
  const tokenFromDb = await tokenService.findToken(refreshToken)

  if (!userData || !tokenFromDb) {
    throw new UnauthorizedError('Invalid refresh token')
  }

  const { email } = userData as ITokenPayload
  const account = await authModel.findOne({ email })

  if (!account) {
    throw new UnauthorizedError('User not found')
  }

  // generate tokens
  const tokens = tokenService.generateTokens({
    email: account.email,
  })

  // save refresh token to db
  await tokenService.saveToken(account._id, tokens.refreshToken)

  return { ...tokens, user: account.email }
}

const getAllAccounts = async () => {
  const accounts = await authModel.find()
  return accounts
}

export const authService = {
  registration,
  signIn,
  signOut,
  refresh,
  getAllAccounts,
}

const _isEmailTaken = async (email: String) => {
  try {
    const existingAuthUser = await authModel.findOne({ email })
    return existingAuthUser ? true : false
  } catch (error) {
    throw error
  }
}

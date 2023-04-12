import bcrypt from 'bcrypt'
import authModel, { ICredentials } from '../../mongodb/models/auth.model.js'
import { tokenService } from '../../service/token.service.js'
import BadRequestError from '../../errors/BadRequestError.js'

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

const signin = async (credentials: ICredentials) => {
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

  return { accessToken, refreshToken, user: account.email }
}

const getCredentials = async (email: String) => {
  try {
    const credentials = await authModel.findOne({ email }).select('+password')
    return credentials
  } catch (error) {
    throw error
  }
}

const deleteAuthUser = async (email: String) => {
  try {
    await authModel.findByIdAndDelete(email)
  } catch (error) {
    throw error
  }
}

export const authService = {
  registration,
  signin,
  getCredentials,
  deleteAuthUser,
}

const _isEmailTaken = async (email: String) => {
  try {
    const existingAuthUser = await authModel.findOne({ email })
    return existingAuthUser ? true : false
  } catch (error) {
    throw error
  }
}

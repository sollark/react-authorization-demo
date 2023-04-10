import bcrypt from 'bcrypt'
import authModel, { ICredentials } from '../../mongodb/models/auth.model.js'
import { tokenService } from '../../service/token.service.js'

const registerNewUser = async (authUser: ICredentials) => {
  try {
    // check if email is already taken
    const isEmailTaken = await _isEmailTaken(authUser.email)
    if (isEmailTaken) {
      // logger.debug(`auth.service - attempt to create new account with existing email: ${authUser.email}`)
      console.log('Email already taken')
      throw new Error('Email already taken')
    }

    // hash password
    const hashPassword = await bcrypt.hash(authUser.password, 10)
    authUser.password = hashPassword

    // create new account
    const newAuthUser = await authModel.create(authUser)
    // logger.info(`auth.service - new account created: ${newAuthUser.email}`)

    // generate tokens
    const { accessToken, refreshToken } = tokenService.generateTokens({
      id: newAuthUser._id,
      email: newAuthUser.email,
    })

    // save refresh token to db
    await tokenService.saveToken(newAuthUser._id, refreshToken)

    return { accessToken, refreshToken, user: newAuthUser.email }
  } catch (error) {
    throw error
  }
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
  registerNewUser,
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

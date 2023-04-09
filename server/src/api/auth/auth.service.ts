import { Types } from 'mongoose'
import authModel, { IAuth } from '../../mongodb/models/auth.model.js'

const addAuthUser = async (authUser: IAuth) => {
  try {
    const newAuthUser = await authModel.create(authUser)
    return newAuthUser
  } catch (error) {
    throw error
  }
}

const getAuthUser = async (email: String) => {
  try {
    const existingAuthUser = await authModel.findOne({ email })
    return existingAuthUser
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
  addAuthUser,
  getAuthUser,
  getCredentials,
  deleteAuthUser,
}

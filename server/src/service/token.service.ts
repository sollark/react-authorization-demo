import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../config/config.js'
import TokenModel from '../mongodb/models/token.model.js'

export interface ITokenPayload {
  email: string
}

function generateTokens(payload: ITokenPayload): {
  accessToken: string
  refreshToken: string
} {
  if (!JWT_ACCESS_SECRET) throw new Error('JWT_ACCESS_SECRET is not defined')
  if (!JWT_REFRESH_SECRET) throw new Error('JWT_REFRESH_SECRET is not defined')

  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '1h' })
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: '10d',
  })

  return { accessToken, refreshToken }
}

async function saveToken(userId: Types.ObjectId, refreshToken: string) {
  const tokenData = await TokenModel.findOne({ userId })

  // update refresh token
  if (tokenData) {
    tokenData.refreshToken = refreshToken
    return tokenData.save()
  }

  // new refresh token
  const token = await TokenModel.create({ userId, refreshToken })

  return token
}

async function removeToken(refreshToken: string) {
  const tokenData = await TokenModel.deleteOne({ refreshToken })

  return tokenData
}

async function findToken(refreshToken: string) {
  const tokenData = await TokenModel.findOne({ refreshToken })

  return tokenData
}

async function validateAccessToken(token: string) {
  if (!JWT_ACCESS_SECRET) throw new Error('JWT_ACCESS_SECRET is not defined')

  try {
    const userData = jwt.verify(token, JWT_ACCESS_SECRET)
    return userData
  } catch (e) {
    return null
  }
}

async function validateRefreshToken(token: string) {
  if (!JWT_REFRESH_SECRET) throw new Error('JWT_REFRESH_SECRET is not defined')

  try {
    const userData = jwt.verify(token, JWT_REFRESH_SECRET)
    return userData
  } catch (e) {
    return null
  }
}

export const tokenService = {
  generateTokens,
  saveToken,
  removeToken,
  findToken,
  validateAccessToken,
  validateRefreshToken,
}

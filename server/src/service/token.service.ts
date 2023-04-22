import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import TokenModel from '../mongodb/models/token.model.js'
import { config } from '../config/config.js'

export interface ITokenPayload {
  email: string
}

function generateTokens(payload: ITokenPayload): {
  accessToken: string
  refreshToken: string
} {
  if (!config.jwt.accessSecret)
    throw new Error('JWT_ACCESS_SECRET is not defined')
  if (!config.jwt.refreshSecret)
    throw new Error('JWT_REFRESH_SECRET is not defined')

  const accessToken = jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: '1h',
  })
  const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
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
  if (!config.jwt.accessSecret)
    throw new Error('JWT_ACCESS_SECRET is not defined')

  try {
    const userData = jwt.verify(token, config.jwt.accessSecret)
    return userData
  } catch (e) {
    return null
  }
}

async function validateRefreshToken(token: string) {
  if (!config.jwt.refreshSecret)
    throw new Error('JWT_REFRESH_SECRET is not defined')

  try {
    const userData = jwt.verify(token, config.jwt.refreshSecret)
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

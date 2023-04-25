import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { config } from '../config/config.js'
import TokenModel from '../mongodb/models/token.model.js'

const { refreshSecret, accessSecret } = config.jwt

export interface ITokenPayload {
  email: string
}

function generateTokens(payload: ITokenPayload): {
  accessToken: string
  refreshToken: string
} {
  if (!accessSecret) throw new Error('JWT_ACCESS_SECRET is not defined')
  if (!refreshSecret) throw new Error('JWT_REFRESH_SECRET is not defined')

  const accessToken = jwt.sign(payload, accessSecret, {
    expiresIn: '1h',
  })
  const refreshToken = jwt.sign(payload, refreshSecret, {
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
  if (!accessSecret) throw new Error('JWT_ACCESS_SECRET is not defined')

  try {
    const userData = jwt.verify(token, accessSecret)
    return userData
  } catch (e) {
    return null
  }
}

async function validateRefreshToken(token: string) {
  if (!refreshSecret) throw new Error('JWT_REFRESH_SECRET is not defined')

  try {
    const userData = jwt.verify(token, refreshSecret)
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

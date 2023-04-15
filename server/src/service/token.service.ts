import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { Types } from 'mongoose'
import TokenModel from '../mongodb/models/token.model.js'
dotenv.config()

export interface ITokenPayload {
  email: string
}

function generateTokens(payload: ITokenPayload): {
  accessToken: string
  refreshToken: string
} {
  const accessSecret = process.env.JWT_ACCESS_SECRET
  if (!accessSecret) throw new Error('JWT_ACCESS_SECRET is not defined')

  const refreshSecret = process.env.JWT_REFRESH_SECRET
  if (!refreshSecret) throw new Error('JWT_REFRESH_SECRET is not defined')

  const accessToken = jwt.sign(payload, accessSecret, { expiresIn: '1h' })
  const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: '10d' })

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
  const secret = process.env.JWT_ACCESS_SECRET
  if (!secret) throw new Error('JWT_ACCESS_SECRET is not defined')

  try {
    const userData = jwt.verify(token, secret)
    return userData
  } catch (e) {
    return null
  }
}

async function validateRefreshToken(token: string) {
  const secret = process.env.JWT_REFRESH_SECRET
  if (!secret) throw new Error('JWT_REFRESH_SECRET is not defined')

  try {
    const userData = jwt.verify(token, secret)
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

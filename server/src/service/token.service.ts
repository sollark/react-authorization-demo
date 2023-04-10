import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { Types } from 'mongoose'
import TokenModel from '../mongodb/models/token.model.js'
dotenv.config()

function generateTokens(payload: any): {
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
    tokenData.token = refreshToken
    return tokenData.save()
  }

  // new refresh token
  const token = await TokenModel.create({ userId, token: refreshToken })
  return token
}

export const tokenService = {
  generateTokens,
  saveToken,
}

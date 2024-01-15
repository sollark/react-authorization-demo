import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'
import TokenDataModel, { TokenData } from '../mongodb/models/token.model.js'
import { SessionData } from './als.service.js'

const { refreshSecret, accessSecret } = config.jwt

function generateTokens(payload: SessionData): {
  accessToken: string
  refreshToken: string
} {
  if (!accessSecret) throw new Error('JWT_ACCESS_SECRET is not defined')
  if (!refreshSecret) throw new Error('JWT_REFRESH_SECRET is not defined')

  console.log('generateTokens, payload', payload)

  const accessToken = jwt.sign(payload, accessSecret, {
    expiresIn: '10m',
  })
  const refreshToken = jwt.sign(payload, refreshSecret, {
    expiresIn: '1h',
  })

  return { accessToken, refreshToken }
}

async function saveToken(refreshToken: string) {
  await TokenDataModel.create({ refreshToken })
}

async function removeToken(refreshToken: string) {
  const result = await TokenDataModel.deleteOne({ refreshToken })

  return result
}

async function getRefreshToken(refreshToken: string) {
  const tokenData = await TokenDataModel.findOne({ refreshToken })

  return tokenData?.refreshToken
}

async function validateAccessToken(token: string) {
  if (!accessSecret) throw new Error('JWT_ACCESS_SECRET is not defined')

  try {
    const payload = jwt.verify(token, accessSecret)

    return payload as jwt.JwtPayload
  } catch (error) {
    console.log('validateAccessToken error', error)
    return null
  }
}

async function validateRefreshToken(token: string) {
  if (!refreshSecret) throw new Error('JWT_REFRESH_SECRET is not defined')

  try {
    const payload = jwt.verify(token, refreshSecret)
    console.log('validateRefreshToken, payload', payload)
    return payload as jwt.JwtPayload
  } catch (error) {
    console.log('validateRefreshToken error', error)
    return null
  }
}

async function isExpired(token: string) {
  const payload = await validateRefreshToken(token)

  if (!payload) return true

  const { exp } = payload

  if (!exp) return true

  const now = Math.floor(Date.now() / 1000)

  if (now > exp) return true

  return false
}

export const tokenService = {
  generateTokens,
  saveToken,
  removeToken,
  getRefreshToken,
  validateAccessToken,
  validateRefreshToken,
  isExpired,
}

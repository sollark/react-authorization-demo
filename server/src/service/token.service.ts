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

  // console.log('generateTokens, data', data)

  const accessToken = jwt.sign({ payload }, accessSecret, {
    expiresIn: '10m',
  })
  const refreshToken = jwt.sign({ payload }, refreshSecret, {
    expiresIn: '1h',
  })

  return { accessToken, refreshToken }
}

async function saveToken(uuid: string, refreshToken: string) {
  const tokenData = await TokenDataModel.findOne({ uuid })

  // update refresh token
  if (tokenData) {
    tokenData.refreshToken = refreshToken
    return tokenData.save()
  }

  // new refresh token
  const token = await TokenDataModel.create({ uuid, refreshToken })

  return token
}

async function removeToken(refreshToken: string) {
  const result = await TokenDataModel.deleteOne({ refreshToken })

  return result
}

async function getTokenData(refreshToken: string): Promise<TokenData | null> {
  const tokenData = await TokenDataModel.findOne({ refreshToken })

  return tokenData
}

async function getUuid(refreshToken: string): Promise<string | null> {
  const tokenData = await TokenDataModel.findOne({ refreshToken })

  return tokenData?.uuid || null
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

export const tokenService = {
  generateTokens,
  saveToken,
  removeToken,
  getTokenData,
  getUuid,
  validateAccessToken,
  validateRefreshToken,
}

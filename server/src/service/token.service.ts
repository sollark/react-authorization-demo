import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

export function generateToken(payload: any): {
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

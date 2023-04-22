import * as dotenv from 'dotenv'

dotenv.config()
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const SERVER_PORT = process.env.SERVER_PORT || 3030

export const MONGO_URL = process.env.MONGO_URL

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

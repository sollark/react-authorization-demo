import * as dotenv from 'dotenv'

dotenv.config()

const NODE_ENV = process.env.NODE_ENV || 'development'
const SERVER_PORT = process.env.PORT || 3030

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || 'http://localhost:3000'

const MONGO_URL = process.env.MONGO_URL

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

export const config = {
  env: NODE_ENV,
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
    origins: ALLOWED_ORIGINS.split(','),
  },
  jwt: {
    accessSecret: JWT_ACCESS_SECRET,
    refreshSecret: JWT_REFRESH_SECRET,
  },
}

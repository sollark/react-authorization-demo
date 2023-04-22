import * as dotenv from 'dotenv'

dotenv.config()
const NODE_ENV = process.env.NODE_ENV || 'development'
const SERVER_PORT = process.env.SERVER_PORT || 3030

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
  },
  jwt: {
    accessSecret: JWT_ACCESS_SECRET,
    refreshSecret: JWT_REFRESH_SECRET,
  },
}

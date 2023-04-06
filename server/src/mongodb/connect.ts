import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

const MONGO_URL = process.env.MONGO_URL
if (!MONGO_URL) {
  throw new Error('MONGO_URL is not defined')
}

export const connectMongo = async () => {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(MONGO_URL)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }
}

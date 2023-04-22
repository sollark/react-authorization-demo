import * as mongoose from 'mongoose'
import { MONGO_URL } from '../config/config.js'

export const connectMongo = async () => {
  if (!MONGO_URL) {
    throw new Error('MONGO_URL is not defined')
  }

  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(MONGO_URL)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }
}

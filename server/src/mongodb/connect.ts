import * as mongoose from 'mongoose'
import { config } from '../config/config.js'
import populateRole from './populate.js'

export const connectMongo = async () => {
  if (!config.mongo.url) {
    throw new Error('MONGO_URL is not defined')
  }

  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(config.mongo.url)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(error)
  }

  populateRole()
}

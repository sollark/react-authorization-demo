import * as mongoose from 'mongoose'
import { config } from '../config/config.js'
import { deleteDatabase } from './delete.js'
import { populate } from './populate.js'

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
    throw new Error('Failed to connect to MongoDB')
  }

  // await populate.populateTestData()

  // Uncomment this lines to delete the database
  // await deleteDatabase(mongoose.connections[0])
  // await mongoose.connection.close()
}

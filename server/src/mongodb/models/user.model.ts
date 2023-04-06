import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true, select: false },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, required: true, select: false },
    sessionToken: { type: String, select: false },
  },
})

export const UserModel = mongoose.model('User', UserSchema)

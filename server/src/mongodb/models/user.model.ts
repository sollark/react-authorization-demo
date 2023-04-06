import { model, Schema } from 'mongoose'

export interface IUser {
  name: string
  lastname: string
  email: string
  role: string
  authentication: {
    password: string
    salt: string
    sessionToken?: string
  }
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true, select: false },
  role: { type: String, required: true, default: 'user' },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, required: true, select: false },
    sessionToken: { type: String, select: false },
  },
})

const UserModel = model<IUser>('User', UserSchema)

export default UserModel

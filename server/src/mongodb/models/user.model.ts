import { model, Schema } from 'mongoose'

export interface IUser {
  name: string
  lastname: string
  email: string
  role: string
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true, select: false },
  role: { type: String, required: true },
})

const UserModel = model<IUser>('User', UserSchema)
export default UserModel

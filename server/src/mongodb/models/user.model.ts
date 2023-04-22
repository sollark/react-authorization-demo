import { model, Schema } from 'mongoose'

export interface IUser {
  name: string
  lastname: string
  email: string
  roles: {}
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true, select: false },
  roles: { type: Object, required: true, select: false },
})

const UserModel = model<IUser>('User', UserSchema)
export default UserModel

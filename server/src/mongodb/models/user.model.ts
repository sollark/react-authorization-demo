import { model, Schema } from 'mongoose'

export interface User {
  identifier: string
  name: string
  lastname: string
  // organization: string
  // roles: UserRole[]
}

const UserSchema = new Schema({
  identifier: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  // organization: { type: String, required: true },
  // roles: { type: Array, required: true },
})

const UserModel = model<User>('User', UserSchema)
export default UserModel

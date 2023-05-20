import { model, Schema } from 'mongoose'

export interface User {
  identifier: string
  firstName: string
  lastname: string
}

const UserSchema = new Schema({
  identifier: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastname: { type: String, required: true },
})

const UserModel = model<User>('User', UserSchema)
export default UserModel

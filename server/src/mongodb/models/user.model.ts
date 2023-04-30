import { model, Schema } from 'mongoose'
import { UserRole } from '../../config/userRoles.js'

export interface IUser {
  name: string
  lastname: string
  email: string
  organization: string
  roles: UserRole[]
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  organization: { type: String, required: true },
  roles: { type: Array, required: true },
})

const UserModel = model<IUser>('User', UserSchema)
export default UserModel

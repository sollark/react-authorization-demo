import { model, Schema, Types } from 'mongoose'

export interface User {
  firstName?: string
  lastName?: string
}

const UserSchema = new Schema({
  identifier: { type: Types.ObjectId, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
})

const UserModel = model<User>('User', UserSchema)
export default UserModel

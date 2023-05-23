import { model, Schema, Types } from 'mongoose'

export interface User {
  identifier: Types.ObjectId
  firstName?: string
  lastname?: string
}

const UserSchema = new Schema({
  identifier: { type: Types.ObjectId, required: true, unique: true },
  firstName: { type: String },
  lastname: { type: String },
})

const UserModel = model<User>('User', UserSchema)
export default UserModel

import { model, Schema, Types } from 'mongoose'

export interface Profile {
  firstName?: string
  lastName?: string
}

const ProfileSchema = new Schema({
  identifier: { type: Types.ObjectId, required: true, unique: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
})

const ProfileModel = model<Profile>('Profile', ProfileSchema)
export default ProfileModel

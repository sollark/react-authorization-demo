import { model, Schema, Types } from 'mongoose'

export type Profile = {
  firstName: string
  lastName: string
  ID: string
}

const ProfileSchema = new Schema({
  identifier: { type: Types.ObjectId, unique: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  ID: { type: String, default: '' },
})

const ProfileModel = model<Profile>('Profile', ProfileSchema)
export default ProfileModel

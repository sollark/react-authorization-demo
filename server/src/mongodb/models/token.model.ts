import { model, Schema, Types } from 'mongoose'

export type RefreshToken = {
  identifier: Types.ObjectId
  refreshToken: string
}

const RefreshTokenSchema = new Schema({
  identifier: { type: Types.ObjectId, ref: 'Auth', required: true },
  refreshToken: { type: String, required: true, unique: true },
})

const RefreshToken = model<RefreshToken>('RefreshToken', RefreshTokenSchema)
export default RefreshToken

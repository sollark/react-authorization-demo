import { model, Schema, Types } from 'mongoose'

export interface Token {
  identifier: Types.ObjectId
  refreshToken: string
}

const TokenSchema = new Schema({
  identifier: { type: Types.ObjectId, ref: 'Auth', required: true },
  refreshToken: { type: String, required: true, unique: true },
})

const TokenModel = model<Token>('Token', TokenSchema)
export default TokenModel

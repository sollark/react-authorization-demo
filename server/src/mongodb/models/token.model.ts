import { model, Schema, Types } from 'mongoose'

export interface IToken {
  userId: Types.ObjectId
  token: string
}

const TokenSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'Auth', required: true },
  refreshToken: { type: String, required: true, unique: true },
})

const TokenModel = model<IToken>('Token', TokenSchema)
export default TokenModel

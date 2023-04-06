import { model, Schema, Types } from 'mongoose'

export interface IToken {
  token: string
}

const TokenSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  refreshToken: { type: String, required: true, unique: true },
})

const TokenModel = model<IToken>('Token', TokenSchema)
export default TokenModel

import { model, Schema } from 'mongoose'

export type TokenData = {
  refreshToken: string
}

const TokenDataSchema = new Schema({
  refreshToken: { type: String, required: true, unique: true },
})

const TokenDataModel = model<TokenData>('TokenData', TokenDataSchema)
export default TokenDataModel

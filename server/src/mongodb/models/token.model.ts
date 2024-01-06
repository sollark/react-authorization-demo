import { model, Schema } from 'mongoose'

export type TokenData = {
  uuid: string
  refreshToken: string
}

const TokenDataSchema = new Schema({
  uuid: { type: String, required: true, unique: true },
  refreshToken: { type: String, required: true, unique: true },
})

const TokenDataModel = model<TokenData>('TokenData', TokenDataSchema)
export default TokenDataModel

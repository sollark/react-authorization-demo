import { model, Schema } from 'mongoose'

export type TokenData = {
  refreshToken: string
  createdAt: Date
}

const TokenDataSchema = new Schema(
  {
    refreshToken: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

const TokenDataModel = model<TokenData>('TokenData', TokenDataSchema)
export default TokenDataModel

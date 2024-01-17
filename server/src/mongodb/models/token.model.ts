import { model, Schema } from 'mongoose'
import { UserData } from '../../service/als.service'

export type TokenData = {
  refreshToken: string
}

export type SessionData = {
  userData: UserData
}

const TokenDataSchema = new Schema({
  refreshToken: { type: String, required: true, unique: true },
})

const TokenDataModel = model<TokenData>('TokenData', TokenDataSchema)
export default TokenDataModel

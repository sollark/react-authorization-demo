import { model, Schema } from 'mongoose'

export interface ICredentials {
  email: string
  password: string
}

const AuthSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
})

const authModel = model<ICredentials>('Auth', AuthSchema)
export default authModel

import { model, Schema } from 'mongoose'

export interface IAuth {
  email: string
  password: string
}

const AuthSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
})

const authModel = model<IAuth>('Auth', AuthSchema)
export default authModel

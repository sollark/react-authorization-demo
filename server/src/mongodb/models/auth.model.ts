import { model, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface Credentials {
  email: string
  password: string
}

const AuthSchema = new Schema({
  uuid: { type: String, default: uuidv4, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
})

const authModel = model<Credentials & { uuid: string }>('Auth', AuthSchema)
export default authModel

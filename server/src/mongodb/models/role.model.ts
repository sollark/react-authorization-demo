import { model, Schema } from 'mongoose'

export interface Role {
  name: string
  code: number
}

const RoleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
})

const RoleModel = model('Role', RoleSchema)
export default RoleModel

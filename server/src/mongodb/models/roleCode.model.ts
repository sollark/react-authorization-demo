import { Schema, Types, model } from 'mongoose'
import { Role } from './role.model.js'

export type RoleCode = '0000' | '1001' | '1010' | '1100' | '1110'
export const ROLE_CODE_MAP: Readonly<Record<Role, RoleCode>> = {
  Guest: '0000',
  Employee: '1001',
  Manager: '1010',
  Supervisor: '1100',
  Admin: '1110',
}

interface RoleCodeMap {
  role: string
  code: string
}

interface RoleCodeMapRef {
  role: Types.ObjectId
  code: RoleCode
}

const RoleCodeSchema = new Schema({
  role: { type: Schema.Types.ObjectId, ref: 'Roles' },
  code: { type: String, required: true, unique: true, immutable: true },
})

const RoleCodeModel = model<RoleCodeMapRef>('RoleCodes', RoleCodeSchema)
export default RoleCodeModel

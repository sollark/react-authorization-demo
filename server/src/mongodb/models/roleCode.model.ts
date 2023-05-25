import { model, Schema } from 'mongoose'

export type RoleCode = '0000' | '1001' | '1010' | '1100' | '1110'
export type UserRole = 'Guest' | 'Employee' | 'Manager' | 'Supervisor' | 'Admin'

export const USER_ROLE = {
  Guest: '0000' as RoleCode,
  Employee: '1001' as RoleCode,
  Manager: '1010' as RoleCode,
  Supervisor: '1100' as RoleCode,
  Admin: '1110' as RoleCode,
}

export interface RoleMap {
  name: UserRole
  code: RoleCode
}

const RoleMapSchema = new Schema({
  name: { type: String, required: true, unique: true },
  code: { type: Number, required: true, unique: true },
})

const RoleMapModel = model('RoleMap', RoleMapSchema)
export default RoleMapModel

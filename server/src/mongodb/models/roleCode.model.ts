import { Schema, model } from 'mongoose'
import { Role } from './role.model.js'

export type RoleCode = '0000' | '0001' | '1001' | '1010' | '1100' | '1110'

export const ROLE_CODE_MAP: Readonly<Record<Role, RoleCode>> = {
  Guest: '0000',
  NoRole: '0001',
  Employee: '1001',
  Manager: '1010',
  Supervisor: '1100',
  Admin: '1110',
}

export interface RoleCodeMap {
  role: Role
  code: RoleCode
}

const RoleCodeSchema = new Schema({
  role: { type: String, required: true, unique: true, immutable: true },
  code: { type: String, required: true, unique: true, immutable: true },
})

const RoleCodeModel = model('RoleCodes', RoleCodeSchema)
export default RoleCodeModel

const populateRoleCode = async () => {
  try {
    // Clear existing roles (optional, depending on your requirements)
    await RoleCodeModel.deleteMany({})

    // Iterate over the USER_ROLE object and create RoleMap documents
    const roleCode = Object.entries(ROLE_CODE_MAP).map(([role, code]) => ({
      role,
      code,
    }))

    // Insert the roles into the database
    await RoleCodeModel.insertMany(roleCode)
  } catch (error) {
    console.error('Error populating role codes:', error)
  }
}

populateRoleCode()

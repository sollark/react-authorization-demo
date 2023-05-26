import { model, Schema } from 'mongoose'

export type RoleCode = '0000' | '1001' | '1010' | '1100' | '1110'
export type Role = 'Guest' | 'Employee' | 'Manager' | 'Supervisor' | 'Admin'

export const ROLE_CODE_MAPPING = {
  Guest: '0000' as RoleCode,
  Employee: '1001' as RoleCode,
  Manager: '1010' as RoleCode,
  Supervisor: '1100' as RoleCode,
  Admin: '1110' as RoleCode,
}

export interface RoleMap {
  name: Role
  code: RoleCode
}

const RoleMapSchema = new Schema({
  name: { type: String, required: true, unique: true, immutable: true },
  code: { type: String, required: true, unique: true, immutable: true },
})

const RoleMapModel = model('RoleMap', RoleMapSchema)
export default RoleMapModel

/*
// Call the populateRoles function to initiate the population process
const populateRoles = async () => {
  try {
    // Clear existing roles (optional, depending on your requirements)
    await RoleMapModel.deleteMany({})

    // Iterate over the ROLE_CODE_MAPPING object and create RoleMap documents
    const roles = Object.entries(ROLE_CODE_MAPPING).map(([name, code]) => ({
      name,
      code,
    }))

    // Insert the roles into the database
    await RoleMapModel.insertMany(roles)
  } catch (error) {}
}

populateRoles()
*/

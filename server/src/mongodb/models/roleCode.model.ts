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
  name: { type: String, required: true, unique: true, immutable: true },
  code: { type: String, required: true, unique: true, immutable: true },
})

const RoleMapModel = model('RoleMap', RoleMapSchema)
export default RoleMapModel

const populateRoles = async () => {
  try {
    // Clear existing roles (optional, depending on your requirements)
    await RoleMapModel.deleteMany({})

    // Iterate over the USER_ROLE object and create RoleMap documents
    const roles = Object.entries(USER_ROLE).map(([name, code]) => ({
      name,
      code,
    }))

    // Insert the roles into the database
    await RoleMapModel.insertMany(roles)
  } catch (error) {}
}

// Call the populateRoles function to initiate the population process
// populateRoles()

import { Schema, model } from 'mongoose'

console.log('ddddd')
export type Role =
  | 'Guest'
  | 'NoRole'
  | 'Employee'
  | 'Manager'
  | 'Supervisor'
  | 'Admin'

export const USER_ROLE: Record<Role, Role> = {
  Guest: 'Guest',
  NoRole: 'NoRole',
  Employee: 'Employee',
  Manager: 'Manager',
  Supervisor: 'Supervisor',
  Admin: 'Admin',
}

const RoleSchema = new Schema({
  role: { type: String, required: true, unique: true, immutable: true },
})

const RoleModel = model('Roles', RoleSchema)
export default RoleModel

const populateRole = async () => {
  console.log('populateRole roles')

  try {
    // Clear existing roles (optional, depending on your requirements)
    await RoleModel.deleteMany({})

    // Iterate over the USER_ROLE object and create Role documents
    const roles = Object.entries(USER_ROLE).map(([role]) => ({
      role,
    }))
    console.log('populateRole roles', roles)

    // Insert the roles into the database
    await RoleModel.insertMany(roles)
  } catch (error) {
    console.error('Error populating roles:', error)
  }
}

populateRole()

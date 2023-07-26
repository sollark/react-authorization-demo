import { Schema, model } from 'mongoose'

export type Role = 'Guest' | 'Employee' | 'Manager' | 'Supervisor' | 'Admin'
export const USER_ROLE = {
  Guest: 'Guest' as Role,
  Employee: 'Employee' as Role,
  Manager: 'Manager' as Role,
  Supervisor: 'Supervisor' as Role,
  Admin: 'Admin' as Role,
}

interface UserRole {
  role: string
}

const RoleSchema = new Schema({
  role: { type: String, required: true, unique: true, immutable: true },
})

const RoleModel = model<UserRole>('Roles', RoleSchema)
export default RoleModel

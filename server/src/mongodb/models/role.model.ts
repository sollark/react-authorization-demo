import { Schema, model } from 'mongoose'

export type Role = 'Guest' | 'User' | 'Manager' | 'Supervisor' | 'Admin'
export const USER_ROLE = {
  Guest: 'Guest' as Role,
  User: 'User' as Role,
  Manager: 'Manager' as Role,
  Supervisor: 'Supervisor' as Role,
  Admin: 'Admin' as Role,
} as const

type UserRole = {
  role: Role
}

const RoleSchema = new Schema({
  role: { type: String, required: true, unique: true, immutable: true },
})

const RoleModel = model<UserRole>('Role', RoleSchema)
export default RoleModel

import { Schema, model } from 'mongoose'

export type Role = 'Guest' | 'User' | 'Manager' | 'Supervisor' | 'Admin'
export const USER_ROLE = {
  guest: 'Guest' as Role,
  user: 'User' as Role,
  manager: 'Manager' as Role,
  supervisor: 'Supervisor' as Role,
  admin: 'Admin' as Role,
} as const

type UserRole = {
  role: Role
}

const RoleSchema = new Schema({
  role: {
    type: String,
    enum: Object.values(USER_ROLE),
    required: true,
    immutable: true,
  },
})

const RoleModel = model<UserRole>('Role', RoleSchema)
export default RoleModel

import { z } from 'zod'

export type Role = 'Guest' | 'User' | 'Manager' | 'Supervisor' | 'Admin'

export const USER_ROLE = {
  guest: 'Guest' as Role,
  user: 'User' as Role,
  manager: 'Manager' as Role,
  supervisor: 'Supervisor' as Role,
  admin: 'Admin' as Role,
}

export type UserRole = {
  role: Role
}

export const userRoleSchema = z.enum([
  'Guest',
  'User',
  'Manager',
  'Supervisor',
  'Admin',
])

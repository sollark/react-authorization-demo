import { z } from 'zod'

export type Role = 'Guest' | 'User' | 'Manager' | 'Supervisor' | 'Admin'

export const USER_ROLE = {
  Guest: 'Guest' as Role,
  Employee: 'User' as Role,
  Manager: 'Manager' as Role,
  Supervisor: 'Supervisor' as Role,
  Admin: 'Admin' as Role,
}

export const userRoleSchema = z.enum([
  'Guest',
  'User',
  'Manager',
  'Supervisor',
  'Admin',
])

import { z } from 'zod'

export type Role = 'Guest' | 'Employee' | 'Manager' | 'Supervisor' | 'Admin'

export const USER_ROLE = {
  Guest: 'Guest' as Role,
  Employee: 'Employee' as Role,
  Manager: 'Manager' as Role,
  Supervisor: 'Supervisor' as Role,
  Admin: 'Admin' as Role,
}

export const userRoleSchema = z.enum([
  'Guest',
  'Employee',
  'Manager',
  'Supervisor',
  'Admin',
])

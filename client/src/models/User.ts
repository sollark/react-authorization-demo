import { z } from 'zod'

export type UserRole = 'Guest' | 'Employee' | 'Manager' | 'Supervisor' | 'Admin'

export const userRoleSchema = z.enum([
  'Guest',
  'Employee',
  'Manager',
  'Supervisor',
  'Admin',
])

export const USER_ROLE = {
  Guest: 'Guest',
  Employee: 'Employee',
  Manager: 'Manager',
  Supervisor: 'Supervisor',
  Admin: 'Admin',
}

export interface User {
  firstName: string
  lastname: string
}

export const UserDetailsSchema = z.object({
  firstName: z.string(),
  lastname: z.string(),
})

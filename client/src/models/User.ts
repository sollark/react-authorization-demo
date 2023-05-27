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
  // identifier: string
  // isAccountComplete: boolean
  // account: {
  //   firstName: string
  //   lastname: string
  // }
  firstName: string
  lastname: string
}

export const UserDetailsSchema = z.object({
  // identifier: z.string(),
  // isAccountComplete: z.boolean(),
  // account: z.object({
  //   firstName: z.string(),
  //   lastname: z.string(),
  //   // workplace: z.array(WorkplaceSchema),
  // }),
  firstName: z.string(),
  lastname: z.string(),
})

import { z } from 'zod'

export type UserRole = 'Guest' | 'Employee' | 'Manager' | 'Supervisor' | 'Admin'
const userRoleSchema = z.enum([
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

export interface Organization {
  name: string
  description: string
}

export const OrganizationSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export interface Workplace {
  organization: Organization
  role: UserRole[]
}

export const WorkplaceSchema = z.object({
  organization: OrganizationSchema,
  role: z.array(userRoleSchema),
})

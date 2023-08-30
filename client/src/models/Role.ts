import { z } from 'zod'

export type RoleCode = '0000' | '1001' | '1010' | '1100' | '1110'
export type RoleName = 'Guest' | 'Employee' | 'Manager' | 'Supervisor' | 'Admin'

export type Role = {
  role: RoleName
}

export const USER_ROLE = {
  Guest: 'Guest' as RoleName,
  Employee: 'Employee' as RoleName,
  Manager: 'Manager' as RoleName,
  Supervisor: 'Supervisor' as RoleName,
  Admin: 'Admin' as RoleName,
}

export const userRoleSchema = z.enum([
  'Guest',
  'Employee',
  'Manager',
  'Supervisor',
  'Admin',
])

import { z } from 'zod'

export type RoleCode = '0000' | '1001' | '1010' | '1100' | '1110'
export type Role = 'Guest' | 'Employee' | 'Manager' | 'Supervisor' | 'Admin'

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

export const CODE_ROLE_MAPPING: Readonly<Record<RoleCode, Role>> = {
  '0000': 'Guest',
  '1001': 'Employee',
  '1010': 'Manager',
  '1100': 'Supervisor',
  '1110': 'Admin',
}

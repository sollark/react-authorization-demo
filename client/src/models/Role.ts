import { z } from 'zod'

export type RoleCode = '0000' | '0001' | '1001' | '1010' | '1100' | '1110'
export type Role =
  | 'Guest'
  | 'NoRole'
  | 'Employee'
  | 'Manager'
  | 'Supervisor'
  | 'Admin'

export const userRoleSchema = z.enum([
  'Guest',
  'NoRole',
  'Employee',
  'Manager',
  'Supervisor',
  'Admin',
])

export const USER_ROLE = {
  Guest: 'Guest' as Role,
  NoRole: 'NoRole' as Role,
  Employee: 'Employee' as Role,
  Manager: 'Manager' as Role,
  Supervisor: 'Supervisor' as Role,
  Admin: 'Admin' as Role,
}

export const CODE_ROLE_MAP: Readonly<Record<RoleCode, Role>> = {
  '0000': 'Guest',
  '0001': 'NoRole',
  '1001': 'Employee',
  '1010': 'Manager',
  '1100': 'Supervisor',
  '1110': 'Admin',
}

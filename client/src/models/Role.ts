import { z } from 'zod'

export type RoleCode = '0000' | '1001' | '1010' | '1100' | '1110'
export type RoleName = 'Guest' | 'Employee' | 'Manager' | 'Supervisor' | 'Admin'

export type Role = {
  role: RoleName
}

export const userRoleSchema = z.enum([
  'Guest',
  'Employee',
  'Manager',
  'Supervisor',
  'Admin',
])

export const USER_ROLE = {
  Guest: 'Guest' as RoleName,
  Employee: 'Employee' as RoleName,
  Manager: 'Manager' as RoleName,
  Supervisor: 'Supervisor' as RoleName,
  Admin: 'Admin' as RoleName,
}

export const CODE_ROLE_MAP: Readonly<Record<RoleCode, RoleName>> = {
  '0000': 'Guest',
  '1001': 'Employee',
  '1010': 'Manager',
  '1100': 'Supervisor',
  '1110': 'Admin',
}

export const ROLE_CODE_MAP: Readonly<Record<RoleName, RoleCode>> = {
  Guest: '0000',
  Employee: '1001',
  Manager: '1010',
  Supervisor: '1100',
  Admin: '1110',
}

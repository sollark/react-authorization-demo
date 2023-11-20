import { Employee } from './Employee'
import { Profile } from './Profile'

export type Status = 'Pending' | 'Active' | 'Inactive' | 'Deleted'
export const ACCOUNT_STATUS = {
  pending: 'Pending' as Status,
  active: 'Active' as Status,
  inactive: 'Inactive' as Status,
  deleted: 'Deleted' as Status,
} as const

export type Role = 'Guest' | 'User' | 'Manager' | 'Supervisor' | 'Admin'
export const USER_ROLE = {
  guest: 'Guest' as Role,
  user: 'User' as Role,
  manager: 'Manager' as Role,
  supervisor: 'Supervisor' as Role,
  admin: 'Admin' as Role,
} as const

export type Account = {
  profile: Profile
  employee?: Employee
  isComplete: boolean
  role: Role
  status: Status
}

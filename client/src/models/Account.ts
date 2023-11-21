import { Employee } from './Employee'
import { Profile } from './Profile'

export type Status = 'pending' | 'active' | 'inactive' | 'deleted'
export const ACCOUNT_STATUS = {
  pending: 'pending' as Status,
  active: 'active' as Status,
  inactive: 'inactive' as Status,
  deleted: 'deleted' as Status,
} as const

export type Role = 'guest' | 'user' | 'manager' | 'supervisor' | 'admin'

export const USER_ROLE = {
  guest: 'guest' as Role,
  user: 'user' as Role,
  manager: 'manager' as Role,
  supervisor: 'supervisor' as Role,
  admin: 'admin' as Role,
}

export type Account = {
  profile: Profile
  employee?: Employee
  isComplete: boolean
  role: Role
  status: Status
}

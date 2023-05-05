export interface Workplace {
  organization: Organization
  role: UserRole[]
}

export interface Organization {
  name: string
  description: string
}

export type UserRole = 'Guest' | 'Employee' | 'Manager' | 'Supervisor' | 'Admin'

export const USER_ROLE = {
  Guest: 'Guest',
  Employee: 'Employee',
  Manager: 'Manager',
  Supervisor: 'Supervisor',
  Admin: 'Admin',
}

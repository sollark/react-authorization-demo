export interface IWorkplace {
  organization: IOrganization
  role: UserRole[]
}

export interface IOrganization {
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

import { Organization } from './organization.model.js'
import { OrganizationCode } from './organizationCode.model.js'
import { RoleCode, UserRole } from './roleCode.model.js'

export interface Workspace {
  organization: Organization
  roles: UserRole[]
}

export interface WorkspaceCode {
  organization: OrganizationCode
  roles: RoleCode[]
}

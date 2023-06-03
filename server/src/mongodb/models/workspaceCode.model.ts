import { OrganizationCode } from './organizationCode.model.js'
import { RoleCode } from './role.model.js'

export interface WorkspaceCode {
  organization: OrganizationCode
  roles: RoleCode[]
}

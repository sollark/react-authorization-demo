import { Organization } from './organization.model.js'
import { RoleCode } from './roleCode.model.js'

export interface enCodedWorkspace {
  organization: Organization
  roles: RoleCode[]
}

import { z } from 'zod'
import { Organization, OrganizationSchema } from './Organization'
import { RoleCode, RoleName } from './Role'

export interface Workspace {
  organization: Organization
  roles: RoleName[]
}

export interface EncodedWorkspace {
  organization: Organization
  roles: RoleCode[]
}

export const WorkspaceSchema = z.object({
  organization: OrganizationSchema,
  // role: z.array(userRoleSchema),
})

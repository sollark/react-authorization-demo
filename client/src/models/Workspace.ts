import { z } from 'zod'
import { Organization, OrganizationSchema } from './Organization'
import { Role, userRoleSchema } from './Role'

export interface Workspace {
  organization: Organization
  roles: Role[]
}

export const WorkspaceSchema = z.object({
  organization: OrganizationSchema,
  // role: z.array(userRoleSchema),
})

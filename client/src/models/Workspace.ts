import { z } from 'zod'
import { Organization, OrganizationSchema } from './Organization'
import { UserRole, userRoleSchema } from './User'

export interface Workspace {
  organization: Organization
  role: UserRole[]
}

export const WorkspaceSchema = z.object({
  organization: OrganizationSchema,
  role: z.array(userRoleSchema),
})

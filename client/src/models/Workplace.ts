import { z } from 'zod'
import { Organization, OrganizationSchema } from './Organization'
import { UserRole, userRoleSchema } from './User'

export interface Workplace {
  organization: Organization
  role: UserRole[]
}

export const WorkplaceSchema = z.object({
  organization: OrganizationSchema,
  role: z.array(userRoleSchema),
})

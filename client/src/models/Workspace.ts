import { z } from 'zod'
import { Company, CompanySchema } from './Company'
import { RoleCode, RoleName } from './Role'

export interface Workspace {
  company: Company
  roles: RoleName[]
}

export interface EncodedWorkspace {
  company: Company
  roles: RoleCode[]
}

export const WorkspaceSchema = z.object({
  company: CompanySchema,
  // role: z.array(userRoleSchema),
})

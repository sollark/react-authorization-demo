import { z } from 'zod'
import { Company, CompanySchema } from './Company'

export type Workspace = {
  company: Company
}

export const WorkspaceSchema = z.object({
  company: CompanySchema,
  // role: z.array(userRoleSchema),
})

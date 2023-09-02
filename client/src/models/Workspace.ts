import { z } from 'zod'
import { Company, CompanySchema } from './Company'
import { Department } from './Department'
import { Profile } from './Profile'

export type Workspace = {
  company: Company
  department?: Department
  employee: Profile
  position?: string
  supervisor?: Profile
  subordinates?: Profile[]
}

export const WorkspaceSchema = z.object({
  company: CompanySchema,
  // role: z.array(userRoleSchema),
})

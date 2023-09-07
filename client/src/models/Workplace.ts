import { z } from 'zod'
import { Company, CompanySchema } from './Company'
import { Department } from './Department'
import { Profile } from './Profile'

export type Workplace = {
  company: Company
  department?: Department
  employeeId?: string
  employee: Profile
  position?: string
  supervisor?: Workplace
  subordinates?: Workplace[]
}

export const WorkplaceSchema = z.object({
  company: CompanySchema,
  // role: z.array(userRoleSchema),
})

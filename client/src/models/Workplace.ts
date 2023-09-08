import { z } from 'zod'
import { Company, CompanySchema } from './Company'
import { Department } from './Department'
import { Profile } from './Profile'

export const employeeIdSchema = z.object({
  employeeId: z
    .string()
    .nonempty({ message: 'Field can not be empty' })
    .trim()
    .length(4, { message: 'Employee id  must be 4 characters' })
    .regex(/^[0-9]*$/, { message: 'Employee id must be numeric' }),
})

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

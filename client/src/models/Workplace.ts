import { z } from 'zod'
import { Company, CompanySchema } from './Company'
import { Department } from './Department'
import { Profile } from './Profile'

export const WorkplaceSchema = z.object({
  company: CompanySchema,
  employeeId: z
    .string()
    .nonempty({ message: 'Field can not be empty' })
    .trim()
    .length(4, { message: 'Employee id  must be 4 characters' })
    .regex(/^[0-9]*$/, { message: 'Employee id must be numeric' }),
  department: z
    .string()
    .nonempty({ message: 'Field can not be empty' })
    .trim()
    .min(2, { message: 'Department must be at least 3 characters' })
    .max(20, { message: 'Department must be less than 20 characters' })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: 'Department must be alphanumeric',
    }),
})

export type Workplace = {
  company: Company
  department?: Department
  employeeId: string
  employee: Profile
  position?: string
  supervisor?: Workplace
  subordinates?: Workplace[]
}

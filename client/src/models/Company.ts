import { z } from 'zod'
import { Department } from './Department'
import { Profile } from './Profile'

export type Company = {
  companyName: string
  companyNumber: string
  departments?: Department[]
  employees?: Profile[]
}

export const CompanyNameSchema = z.object({
  companyName: z
    .string()
    .nonempty({ message: 'Field can not be empty' })
    .trim()
    .min(2, { message: 'Company name must be at least 3 characters' })
    .max(20, { message: 'Company name must be less than 20 characters' })
    .regex(/^[a-zA-Z0-9]*$/, { message: 'Company name must be alphanumeric' }),
})
export const CompanyNumberSchema = z.object({
  companyNumber: z
    .string()
    .nonempty({ message: 'Field can not be empty' })
    .trim()
    .length(4, { message: 'Company number must be 4 characters' })
    .regex(/^[0-9]*$/, { message: 'Company number must be numeric' }),
})

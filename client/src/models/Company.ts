import { z } from 'zod'
import { Department } from './Department'
import { Profile } from './Profile'

export type Company = {
  companyName: string
  companyId: string
  departments?: Department[]
  employees?: Profile[]
}

// TODO replace this schema with CompanyNameSchema
export const CompanySchema = z.object({
  company: z
    .string()
    .nonempty({ message: 'Field can not be empty' })
    .trim()
    .min(2, { message: 'Company must be at least 3 characters' })
    .max(20, { message: 'Company must be less than 20 characters' }),
})

export const CompanyIdSchema = z.object({
  companyId: z
    .string()
    .nonempty({ message: 'Field can not be empty' })
    .trim()
    .length(4, { message: 'Company id must be 4 characters' })
    .regex(/^[0-9]*$/, { message: 'Company id must be numeric' }),
})

// TODO change regex to make it work with other languages
export const CompanyNameSchema = z.object({
  company: z
    .string()
    .nonempty({ message: 'Field can not be empty' })
    .trim()
    .min(2, { message: 'Company name must be at least 3 characters' })
    .max(20, { message: 'Company name must be less than 20 characters' })
    .regex(/^[a-zA-Z0-9]*$/, { message: 'Company name must be alphanumeric' }),
})

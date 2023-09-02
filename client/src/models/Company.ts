import { z } from 'zod'
import { Department } from './Department'
import { Profile } from './Profile'

export type Company = {
  companyName: string
  companyCode: string
  departments?: Department[]
  employees?: Profile[]
}

export const CompanySchema = z.object({
  company: z
    .string()
    .nonempty({ message: 'Field can not be empty' })
    .trim()
    .min(2, { message: 'Company must be at least 3 characters' })
    .max(20, { message: 'Company must be less than 20 characters' }),
})

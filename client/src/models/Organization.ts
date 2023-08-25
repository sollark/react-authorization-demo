import { z } from 'zod'

export interface Company {
  companyName: string
  companyCode: string
}

export const CompanySchema = z.object({
  company: z
    .string()
    .nonempty({ message: 'Field can not be empty' })
    .trim()
    .min(2, { message: 'Company must be at least 3 characters' })
    .max(20, { message: 'Company must be less than 20 characters' }),
})

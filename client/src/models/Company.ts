import { z } from 'zod'
import { Department } from './Departament'
import { Employee } from './Employee'

export type Company = {
  companyName: string
  companyCode: string
  departments?: Department[]
  employees?: Employee[]
}

export const CompanySchema = z.object({
  company: z
    .string()
    .nonempty({ message: 'Field can not be empty' })
    .trim()
    .min(2, { message: 'Company must be at least 3 characters' })
    .max(20, { message: 'Company must be less than 20 characters' }),
})

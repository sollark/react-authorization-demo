import { z } from 'zod'
import { Department } from './Department'
import { Employee } from './Employee'

export type Company = {
  companyName: string
  companyNumber: string
  departments: Department[]
  employees: Employee[]
}

export const CompanyNameSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, { message: 'Field can not be empty' })
    .min(2, { message: 'Company name must be at least 3 characters' })
    .max(20, { message: 'Company name must be less than 20 characters' })
    .regex(/^[a-zA-Z0-9]*$/, { message: 'Company name must be alphanumeric' }),
})
export const CompanyNumberSchema = z.object({
  companyNumber: z
    .string()
    .trim()
    .min(1, { message: 'Field can not be empty' })
    .length(4, { message: 'Company number must be 4 characters' })
    .regex(/^[0-9]*$/, { message: 'Company number must be numeric' }),
})

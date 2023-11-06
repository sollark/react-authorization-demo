import { z } from 'zod'
import { Company } from './Company'
import { Department } from './Department'
import { Profile } from './Profile'

export type Employee = {
  company: Company
  department?: Department
  employeeNumber: string
  profile: Profile
  position?: string
  supervisor?: Employee
  subordinates?: Employee[]
}

export const EmployeeNumberSchema = z.object({
  employeeNumber: z
    .string()
    .nonempty({ message: 'Field can not be empty' })
    .trim()
    .length(4, { message: 'Employee number  must be 4 characters' })
    .regex(/^[0-9]*$/, { message: 'Employee number must be numeric' }),
})

export const DepartmentNameSchema = z.object({
  departmentName: z
    .string()
    .nonempty({ message: 'Field can not be empty' })
    .trim()
    .min(2, { message: 'Department must be at least 3 characters' })
    .max(20, { message: 'Department must be less than 20 characters' })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: 'Department must be alphanumeric',
    }),
})

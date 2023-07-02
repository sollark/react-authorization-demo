import { REGEX } from '@/config/regex'
import { z } from 'zod'

export interface User {
  firstName: string
  lastName: string
}

export const UserDetailsSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty({ message: 'Field can not be empty' })
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(20, { message: 'First name must be less than 20 characters' }),
  lastName: z
    .string()
    .trim()
    .nonempty({ message: 'Field can not be empty' })
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(20, { message: 'Last name must be less than 20 characters' }),
  // phone: z
  //   .string()
  //   .trim()
  //   .nonempty({ message: 'Field can not be empty' })
  //   .regex(REGEX.PHONE_NUMBER_IL, 'Invalid phone number'),
})

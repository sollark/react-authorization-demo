import { z } from 'zod'

export interface Auth {
  isAuth: boolean
}

export interface AuthCredentials {
  email: string
  password: string
}

export const RegistrationSchema = z
  .object({
    email: z
      .string()
      .trim()
      .nonempty({ message: 'Field can not be empty' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string()
      .trim()
      .nonempty({ message: 'Field can not be empty' })
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(20, { message: 'Password must be less than 20 characters' }),
    confirmedPassword: z
      .string()
      .trim()
      .nonempty({ message: 'Field can not be empty' })
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(20, { message: 'Password must be less than 20 characters' }),
  })
  .refine(({ confirmedPassword, password }) => confirmedPassword === password, {
    message: 'Passwords do not match',
    path: ['confirmedPassword'],
  })

export const SignInSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: 'Field can not be empty' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .trim()
    .nonempty({ message: 'Field can not be empty' })
    .min(6, { message: 'Password must be at least 6 characters' }),
})

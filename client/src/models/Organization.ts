import { z } from 'zod'

export interface Organization {
  organizationName: string
  organizationCode: string
  // description: string
}

export const OrganizationSchema = z.object({
  organization: z
    .string()
    .nonempty({ message: 'Field can not be empty' })
    .trim()
    .min(2, { message: 'Organization must be at least 3 characters' })
    .max(20, { message: 'Organization must be less than 20 characters' }),
  // description: z.string(),
})

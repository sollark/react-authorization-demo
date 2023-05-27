import { z } from 'zod'

export interface Organization {
  name: string
  description: string
}

export const OrganizationSchema = z.object({
  name: z.string(),
  description: z.string(),
})

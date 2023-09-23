import { Profile } from '@/models/Profile'
import { httpService } from './axios/http.service'

async function getAllEmployees(): Promise<Profile[] | null> {
  const response = await httpService.get<null, Profile[]>(
    'workplace/getAllEmployees',
    null
  )

  console.log('workspaceService - getAllEmployees, response.data', response)

  const { employees } = response as any
  //   if (employees) storeService.saveEmployees(employees)

  return employees ? employees : null
}

export const workplaceService = { getAllEmployees }

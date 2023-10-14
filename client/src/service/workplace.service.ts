import { Employee } from '@/cmps/tables/EmployeeTable'
import { Account } from '@/models/Account'
import { Profile } from '@/models/Profile'
import { Workplace } from '@/models/Workplace'
import { httpService } from './axios/http.service'
import { storeService } from './store.service'

async function updateEmployee(employee: Employee) {
  const response = await httpService.post<
    Partial<Account> & Partial<Workplace> & Omit<Profile, 'ID'>,
    Account
  >('account/update', employee)

  console.log('accountService - update, response data', response)

  const { account } = response as any
  if (account) storeService.saveAccount(account)

  return account ? account : null
}

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

import { Account } from '@/models/Account'
import { httpService } from './axios/http.service'

async function getAllEmployees(): Promise<Account[] | null> {
  const response = await httpService.get<null, Account[]>(
    'company/employees',
    null
  )

  //TODO build employees from accounts
  console.log('employeeService - getAllEmployees, response.data', response)

  const { employees } = response as any
  //   if (employees) storeService.saveEmployees(employees)

  return employees ? employees : null
}

export const employeeService = { getAllEmployees }
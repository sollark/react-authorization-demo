import { Account } from '@/models/Account'
import { Company } from '@/models/Company'
import { Department } from '@/models/Department'
import { Employee } from '@/models/Employee'
import { Profile } from '@/models/Profile'
import { HttpResponse, httpService } from './axios/http.service'
import { storeService } from './store.service'

async function updateEmployee(
  firstName: string,
  lastName: string,
  ID: string,
  departmentName: string,
  position: string
) {
  const response = await httpService.post<
    Profile & Partial<Company> & Partial<Department> & Partial<Employee>,
    Account
  >('account/update', {
    firstName,
    lastName,
    ID,
    departmentName,
    position,
  })

  console.log('accountService - update, response data', response)

  const { account } = response as any
  if (account) storeService.saveAccount(account)

  return account ? account : null
}

async function joinCompany(companyNumber: string, employeeNumber: string) {
  const response = await httpService.post<
    Partial<Company> & Partial<Employee>,
    Account
  >('account/join', {
    companyNumber,
    employeeNumber,
  })

  console.log('accountService - joinCompany, response data', response)

  const { account } = response as any
  if (account) storeService.saveAccount(account)

  return account ? account : null
}

// TODO this function is meant to be used by the admin to get all employees in database
async function getAllEmployees(): Promise<Employee[] | null> {
  const response = await httpService.get<null, Employee[]>(
    'company/employees',
    null
  )

  console.log('employeeService - getAllEmployees, response.data', response)

  const { success, message, data } = response as any
  const employees = data.employees

  return employees ? employees : null
}

async function getCompany(): Promise<Company | null> {
  const response = await httpService.get<null, HttpResponse>('company', null)

  console.log('employeeService - getCompany, response.data', response)

  const { success, message, data } = response as any

  return data.company ? data.company : null
}
export const employeeService = { updateEmployee, getCompany, getAllEmployees }

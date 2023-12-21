import { Account, Role, Status } from '@/models/Account'
import { Company } from '@/models/Company'
import { Department } from '@/models/Department'
import { Employee } from '@/models/Employee'
import { Profile } from '@/models/Profile'
import useCompanyStore from '@/stores/companyStore'
import { httpService } from './axios/http.service'

type AccountData = {
  account: Account
}

type EmployeeAccountData = {
  accounts: Partial<Account>[]
}

type UpdateEmployeeAccountData = {
  accounts: Partial<Account>
}

type AllEmployeeData = {
  employees: Employee[]
}

async function getCompanyEmployeeBasicData(): Promise<Employee[] | null> {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const data = await httpService.get<null, Employee[]>(
    `company/${companyNumber}/employees/basicTableData`,
    null
  )

  console.log('employeeService - getCompanyEmployeeBasicData, data', data)

  return data || null
}

async function getCompanyEmployeeAdvancedData(): Promise<Employee[] | null> {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const data = await httpService.get<null, Employee[]>(
    `company/${companyNumber}/employees/advancedTableData`,
    null
  )

  console.log('employeeService - getCompanyEmployeeAdvancedData, data', data)

  return data || null
}

async function updateCompanyEmployee(
  firstName: string,
  lastName: string,
  ID: string,
  departmentName: string,
  employeeNumber: string,
  position: string
) {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const data = await httpService.put<
    Profile & Partial<Company> & Partial<Department> & Partial<Employee>,
    AccountData
  >(`company/${companyNumber}/employees/${employeeNumber}`, {
    firstName,
    lastName,
    ID,
    departmentName,
    position,
  })

  console.log('employeeService - updateCompanyEmployee, data:', data)

  return data?.account || null
}

async function deleteCompanyEmployee(employeeNumber: string) {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()
  const data = await httpService.delete<null, null>(
    `company/${companyNumber}/employees/${employeeNumber}`,
    null
  )

  console.log('employeeService - deleteCompanyEmployee, data: ', data)

  return true
}

async function getEmployeeAccountData(): Promise<Partial<Account>[] | null> {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const data = await httpService.get<null, EmployeeAccountData>(
    `company/${companyNumber}/accounts`,
    null
  )

  console.log('employeeService - getEmployeeAccountData, data', data)

  return data?.accounts || null
}

async function updateEmployeeAccount(
  employeeNumber: string,
  role: Role,
  status: Status
): Promise<Partial<Account> | null> {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const data = await httpService.put<
    Partial<Account>,
    UpdateEmployeeAccountData
  >(`company/${companyNumber}/accounts/${employeeNumber}`, { role, status })

  console.log('employeeService - updateEmployeeAccount, data', data)

  return data?.accounts || null
}

async function getAllEmployees(): Promise<Employee[] | null> {
  const data = await httpService.get<null, AllEmployeeData>(
    'employee/all',
    null
  )

  console.log('employeeService - getAllEmployees, data: ', data)

  return data?.employees || null
}

export const employeeService = {
  getCompanyEmployeeBasicData,
  getCompanyEmployeeAdvancedData,
  updateCompanyEmployee,
  deleteCompanyEmployee,
  getEmployeeAccountData,
  updateEmployeeAccount,
  getAllEmployees,
}

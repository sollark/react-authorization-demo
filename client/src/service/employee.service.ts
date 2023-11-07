import { Company } from '@/models/Company'
import { Employee } from '@/models/Employee'
import { HttpResponse, httpService } from './axios/http.service'

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
export const employeeService = { getCompany, getAllEmployees }

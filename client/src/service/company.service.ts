import { Company } from '@/models/Company'
import useEmployeeStore from '@/stores/employeeStore'
import { httpService } from './axios/http.service'

type BasicCompanyData = {
  basicCompanyData: Partial<Company>
}

type AdvancedCompanyData = {
  company: Company
}

async function getBasicCompanyData(): Promise<Partial<Company> | null> {
  const companyNumber = useEmployeeStore.getState().getCompanyNumber()

  const data = await httpService.get<null, BasicCompanyData>(
    `company/${companyNumber}/basic`,
    null
  )

  console.log('companyService - getBasicCompanyData, data', data)

  return data?.basicCompanyData || null
}

async function getAdvancedCompanyData(): Promise<Company | null> {
  const companyNumber = useEmployeeStore.getState().getCompanyNumber()

  const data = await httpService.get<null, AdvancedCompanyData>(
    `company/${companyNumber}`,
    null
  )

  console.log('companyService - getAdvancedCompanyData, data', data)

  return data?.company || null
}

export const companyService = {
  getBasicCompanyData,
  getAdvancedCompanyData,
}

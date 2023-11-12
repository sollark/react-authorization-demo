import { Company } from '@/models/Company'
import { httpService } from './axios/http.service'

async function getBasicCompanyData(): Promise<Company | null> {
  const response = await httpService.get<null, Company>('company', null)

  console.log('companyService - getBasicCompanyData, response.data', response)

  const { success, message, data } = response as any
  if (!success) {
    console.log(message)
    return null
  }

  return data.company ? data.company : null
}

async function getAdvancedCompanyData() {}

export const companyService = {
  getBasicCompanyData,
  getAdvancedCompanyData,
}

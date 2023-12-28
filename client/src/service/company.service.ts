import { Company } from '@/models/Company'
import useCompanyStore from '@/stores/companyStore'
import { httpService } from './axios/http.service'
import { log } from './console.service'

type BasicCompanyData = {
  basicCompanyData: Partial<Company>
}

type AdvancedCompanyData = {
  company: Company
}

async function getBasicCompanyData(): Promise<Partial<Company> | null> {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const data = await httpService.get<null, BasicCompanyData>(
    `company/${companyNumber}/basic`,
    null
  )

  log('companyService - getBasicCompanyData, data', data)

  return data?.basicCompanyData || null
}

async function getAdvancedCompanyData(): Promise<Company | null> {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const data = await httpService.get<null, AdvancedCompanyData>(
    `company/${companyNumber}`,
    null
  )

  log('companyService - getAdvancedCompanyData, data', data)

  return data?.company || null
}

export const companyService = {
  getBasicCompanyData,
  getAdvancedCompanyData,
}

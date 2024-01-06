import { Company } from '@/models/Company'
import useCompanyStore from '@/stores/companyStore'
import { httpService } from './axios/http.service'
import { log } from './console.service'

type BasicCompanyData = {
  basicCompanyData: Partial<Company>
}

type AdvancedCompanyData = {
  advancedCompanyData: Company
}

async function getBasicCompanyData(): Promise<Partial<Company> | null> {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const response = await httpService.get<null, BasicCompanyData>(
    `company/${companyNumber}/basic`,
    null
  )

  log('companyService - getBasicCompanyData, response', response)

  if (!response) {
    log('companyService - getBasicCompanyData, no response from the server')
    return null
  }

  const { success, message } = response
  if (!success) {
    log('companyService - getBasicCompanyData, message', message)
    return null
  }

  const { data } = response

  return data.basicCompanyData || null
}

async function getAdvancedCompanyData(): Promise<Company | null> {
  const companyNumber = useCompanyStore.getState().getCompanyNumber()

  const response = await httpService.get<null, AdvancedCompanyData>(
    `company/${companyNumber}`,
    null
  )

  log('companyService - getAdvancedCompanyData, response', response)

  if (!response) {
    log('companyService - getAdvancedCompanyData, no response from the server')
    return null
  }

  const { success, message } = response
  if (!success) {
    log('companyService - getAdvancedCompanyData, message', message)
    return null
  }

  const { data } = response

  return data.advancedCompanyData || null
}

export const companyService = {
  getBasicCompanyData,
  getAdvancedCompanyData,
}

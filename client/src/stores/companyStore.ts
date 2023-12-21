import { Company } from '@/models/Company'
import { Department } from '@/models/Department'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

type CompanyState = {
  company: Company | null
  setCompany: (company: Company) => void
  clearCompany: () => void
  getCompanyNumber: () => string | null
  getCompanyDepartments: () => Department[] | null
}

const useCompanyStore = create<CompanyState>()(
  zustandLogger(
    persist(
      devtools(
        immer((set, get) => ({
          company: null,
          setCompany: (company) => set(() => ({ company })),
          clearCompany: () => set(() => ({ company: null })),
          getCompanyNumber: () => get().company?.companyNumber || null,
          getCompanyDepartments: () => get().company?.departments || null,
        }))
      ),
      { name: 'company-storage' }
    )
  )
)
export default useCompanyStore

import { Company } from '@/models/Company'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

interface CompanyState {
  company: Company | null
  setCompany: (company: Company | null) => void
  clearCompany: () => void
}

// Create a store with initial state
const useCompanyStore = create<CompanyState>()(
  zustandLogger(
    persist(
      devtools(
        immer((set) => ({
          company: null,
          setCompany: (company) => set(() => ({ company })),
          clearCompany: () => set(() => ({ company: null })),
        }))
      ),
      { name: 'company-storage' }
    )
  )
)

export default useCompanyStore

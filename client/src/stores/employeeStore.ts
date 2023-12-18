import { Employee } from '@/models/Employee'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

type EmployeeState = {
  employee: Employee | null
  setEmployee: (employee: Employee) => void
  clearEmployee: () => void
  getCompanyNumber: () => string | null
}

const useEmployeeStore = create<EmployeeState>()(
  zustandLogger(
    persist(
      devtools(
        immer((set, get) => ({
          employee: null,
          setEmployee: (employee) => set(() => ({ employee })),
          clearEmployee: () => set(() => ({ employee: null })),
          getCompanyNumber: () =>
            get().employee?.company?.companyNumber || null,
        }))
      ),
      { name: 'employee-storage' }
    )
  )
)

export default useEmployeeStore

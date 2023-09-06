import { Workplace } from '@/models/Workplace'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

type WorkplaceState = {
  workplace: Workplace | null
  setWorkplace: (workplace: Workplace) => void
  clearWorkplace: () => void
}

const useWorkplaceStore = create<WorkplaceState>()(
  zustandLogger(
    persist(
      devtools(
        immer((set) => ({
          workplace: null,
          setWorkplace: (workplace) => set(() => ({ workplace })),
          clearWorkplace: () => set(() => ({ workplace: null })),
        }))
      ),
      { name: 'workplace-storage' }
    )
  )
)

export default useWorkplaceStore

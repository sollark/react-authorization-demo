import { workplace } from '@/models/workplace'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

interface WorkplaceState {
  workplace: workplace | null
  setWorkplace: (workplace: workplace) => void
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

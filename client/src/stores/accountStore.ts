import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

interface AccountState {
  isComplete: boolean
  setIsComplete: (isComplete: boolean) => void
  resetIsComplete: () => void
}

// Create a store with initial state
const useAccountStore = create<AccountState>()(
  zustandLogger(
    persist(
      devtools(
        immer((set) => ({
          isComplete: false,
          setIsComplete: (isComplete) => set(() => ({ isComplete })),
          resetIsComplete: () => set(() => ({ isComplete: false })),
        }))
      ),
      { name: 'account-storage' }
    )
  )
)

export default useAccountStore

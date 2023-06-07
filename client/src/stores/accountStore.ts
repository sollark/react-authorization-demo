import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface AccountState {
  isComplete: boolean

  setIsComplete: (isComplete: AccountState['isComplete']) => void
}

// Create a store with initial state
const useAccountStore = create<AccountState>()(
  devtools(
    immer((set) => ({
      isComplete: false,
      setIsComplete: (isComplete) => set({ isComplete }),
    }))
  )
)

export default useAccountStore

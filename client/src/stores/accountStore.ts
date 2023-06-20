import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface AccountState {
  isComplete: boolean
  setIsComplete: (isComplete: boolean) => void
  setAccountAsComplete: () => void
  clearAccount: () => void
}

// Create a store with initial state
const useAccountStore = create<AccountState>()(
  persist(
    devtools(
      immer((set) => ({
        isComplete: false,
        setIsComplete: (isComplete) => set(() => ({ isComplete })),
        setAccountAsComplete: () => set(() => ({ isComplete: true })),
        clearAccount: () => set(() => ({ isComplete: false })),
      }))
    ),
    { name: 'account-storage' }
  )
)

export default useAccountStore

// getter:
// const { isComplete } = useAccountStore()
// const  isComplete = useAccountStore(state => state.isComplete) // this is optimal and not cause rerender when other state properties change

// setter
// useAccountStore.setState({ isComplete: true })
// const setAccountAsComplete = useAccountStore((state) => state.setAccountAsComplete)

// run function
// useAccountStore.getState().clearAccount()

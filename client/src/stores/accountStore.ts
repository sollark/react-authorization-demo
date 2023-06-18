import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface AccountState {
  isComplete: boolean
  setAccountAsComplete: () => void
  clearAccount: () => void
}

// Create a store with initial state
const useAccountStore = create<AccountState>()(
  devtools(
    immer((set) => ({
      isComplete: false,
      setAccountAsComplete: () => set(() => ({ isComplete: true })),
      clearAccount: () => set(() => ({ isComplete: false })),
    }))
  )
)

export default useAccountStore

// getter:
// const { isComplete } = useAccountStore()
// const  isComplete = useAccountStore(state => state.isComplete) // this is optimal and not cause rerender when other state properties change

// setter
// useAccountStore.setState({ isComplete: true })
// const setAccountAsComplete = useAccountStore((state) => state.setAccountAsComplete)

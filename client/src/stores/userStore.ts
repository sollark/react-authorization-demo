import { User } from '@/models/User'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface UserState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

// Create a store with initial state
const useUserStore = create<UserState>()(
  devtools(
    immer((set) => ({
      user: null,
      setUser: (user) => set(() => ({ user })),
      clearUser: () => set(() => ({ user: null })),
    }))
  )
)

export default useUserStore

// getter:
// const { user } = useUserStore()
// const  user = useUserStore(state => state.user) // this is optimal and not cause rerender when other state properties change
// const firstName = user?.firstName

// setter
// useUserStore.setState({ user: account.user })

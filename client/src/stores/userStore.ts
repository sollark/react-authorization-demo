import { User } from '@/models/User'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface UserState {
  user: User | null
  setUser: (user: UserState['user']) => void
}

// Create a store with initial state
const useUserStore = create<UserState>()(
  devtools(
    immer((set) => ({
      user: null,
      setUser: (user) => set(() => ({ user: user })),
    }))
  )
)

export default useUserStore

// getter:
// const { user } = useUserStore()
// const firstName = user?.firstName

// setter
// useUserStore.setState({ user: account.user })

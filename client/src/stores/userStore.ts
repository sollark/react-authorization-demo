import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface UserState {
  user: {
    name: string
    email: string
    role: string
  } | null
  setUser: (user: UserState['user']) => void
}

// Create a store with initial state
const useUserStore = create<UserState>()(
  devtools(
    immer((set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }))
  )
)

export default useUserStore

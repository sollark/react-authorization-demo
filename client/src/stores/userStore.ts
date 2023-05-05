import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Auth } from '../models/User'

interface UserState {
  user: {
    email: string
  } | null
  auth: Auth
  setUser: (user: UserState['user']) => void
  setAuth: (auth: UserState['auth']) => void
}

// Create a store with initial state
const useUserStore = create<UserState>()(
  devtools(
    immer((set) => ({
      user: null,
      auth: { isAuth: false },
      setUser: (user) => set({ user }),
      setAuth: (auth) => set({ auth }),
    }))
  )
)

export default useUserStore

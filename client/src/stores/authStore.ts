import { create } from 'zustand'
import { zustandLogger } from './zustandLogger'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface AuthState {
  token: string | null
  setToken: (token: string) => void
  clearToken: () => void
}

// Create a store with initial state
const useAuthStore = create<AuthState>()(
  zustandLogger(
    devtools(
      immer((set) => ({
        token: null,
        setToken: (token) => set(() => ({ token })),
        clearToken: () => set(() => ({ token: null })),
      }))
    )
  )
)

export default useAuthStore

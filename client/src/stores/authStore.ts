import { authService } from '@/service/auth.service'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

interface AuthState {
  isAuthenticated: boolean
  setAsAuthenticated: () => void
  setAsUnauthenticated: () => void
  token: string | null
  setToken: (token: string) => void
  clearToken: () => void
  getAccess: () => void
}

// Create a store with initial state
const useAuthStore = create<AuthState>()(
  zustandLogger(
    devtools(
      immer((set) => ({
        isAuthenticated: false,
        setAsAuthenticated: () => set(() => ({ isAuthenticated: true })),
        setAsUnauthenticated: () => set(() => ({ isAuthenticated: false })),
        token: null,
        setToken: (token) => set(() => ({ token })),
        clearToken: () => set(() => ({ token: null })),
        getAccess: async () => {
          await authService.getAccess()
        },
      }))
    )
  )
)

export default useAuthStore

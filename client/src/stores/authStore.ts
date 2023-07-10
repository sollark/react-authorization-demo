import { authService } from '@/service/auth.service'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

interface AuthState {
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
        token: null,
        setToken: (token) => set(() => ({ token })),
        clearToken: () => set(() => ({ token: null })),
        getAccess: async () => {
          const response = await authService.getAccess()
        },
      }))
    )
  )
)

export default useAuthStore

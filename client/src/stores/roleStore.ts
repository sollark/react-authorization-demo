import { Role } from '@/models/Role'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface RoleState {
  roles: Role[]
  setRoles: (roles: Role[]) => void
  clearRoles: () => void
}

// Create a store with initial state
const useRoleStore = create<RoleState>()(
  devtools(
    immer((set) => ({
      roles: ['Guest'],
      setRoles: (roles) => set(() => ({ roles })),
      clearRoles: () => set(() => ({ roles: ['Guest'] })),
    }))
  )
)

export default useRoleStore

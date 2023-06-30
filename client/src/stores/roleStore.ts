import { Role, USER_ROLE } from '@/models/Role'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

interface RoleState {
  roles: Role[]
  setRoles: (roles: Role[]) => void
  clearRoles: () => void
}

// Create a store with initial state
const useRoleStore = create<RoleState>()(
  zustandLogger(
    persist(
      devtools(
        immer((set) => ({
          roles: [USER_ROLE.Guest],
          setRoles: (roles) => set(() => ({ roles })),
          clearRoles: () => set(() => ({ roles: [USER_ROLE.Guest] })),
        }))
      ),
      { name: 'role-storage' }
    )
  )
)

export default useRoleStore

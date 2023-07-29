import { ROLE_CODE_MAP, Role, RoleCode } from '@/models/Role'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

interface RoleState {
  roles: RoleCode[]
  setRoles: (roles: Role[]) => void
  clearRoles: () => void
}

// Create a store with initial state
const useRoleStore = create<RoleState>()(
  zustandLogger(
    persist(
      devtools(
        immer((set) => ({
          roles: [ROLE_CODE_MAP.Guest],
          setRoles: (roles) => set(() => ({ roles })),
          clearRoles: () => set(() => ({ roles: [ROLE_CODE_MAP.Guest] })),
        }))
      ),
      { name: 'role-storage' }
    )
  )
)

export default useRoleStore

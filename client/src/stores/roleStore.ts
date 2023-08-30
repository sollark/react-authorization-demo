import { Role, USER_ROLE } from '@/models/Role'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

interface RoleState {
  role: Role
  setRole: (role: Role) => void
  clearRole: () => void
}

// Create a store with initial state
const useRoleStore = create<RoleState>()(
  zustandLogger(
    persist(
      devtools(
        immer((set) => ({
          role: USER_ROLE.Guest,
          setRole: (role) => set(() => ({ role })),
          clearRole: () => set(() => ({ role: USER_ROLE.Guest })),
        }))
      ),
      { name: 'role-storage' }
    )
  )
)

export default useRoleStore

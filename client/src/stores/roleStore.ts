import { Role, USER_ROLE } from '@/models/Account'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

type RoleState = {
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
          role: USER_ROLE.guest,
          setRole: (role) => set(() => ({ role })),
          clearRole: () => set(() => ({ role: USER_ROLE.guest })),
        }))
      ),
      { name: 'role-storage' }
    )
  )
)

export default useRoleStore

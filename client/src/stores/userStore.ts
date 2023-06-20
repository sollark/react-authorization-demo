import { User } from '@/models/User'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

interface UserState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

// Create a store with initial state
const useUserStore = create<UserState>()(
  zustandLogger(
    persist(
      devtools(
        immer((set) => ({
          user: null,
          setUser: (user) => set(() => ({ user })),
          clearUser: () => set(() => ({ user: null })),
        }))
      ),
      { name: 'user-storage' }
    )
  )
)

export default useUserStore

// getter:
// const { user } = useUserStore()
// const  user = useUserStore(state => state.user) // this is optimal and not cause rerender when other state properties change
// const firstName = user?.firstName

// setter
// useUserStore.setState({ user: account.user })

// run function
// useUserStore.getState().setUser(account.user)

// doesn't work in function (hooks rules)
// const setAccountAsComplete = useAccountStore(
//   (state) => state.setAccountAsComplete
// )

// works in function
// useAccountStore.getState().setAccountAsComplete()

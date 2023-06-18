import useAccountStore from '@/stores/accountStore'
import useOrganizationStore from '@/stores/orgainzaionStore'
import useRoleStore from '@/stores/roleStore'
import useUserStore from '@/stores/userStore'

function clearStoreStates() {
  const clearUser = useUserStore((state) => state.clearUser)
  const clearAccount = useAccountStore((state) => state.clearAccount)
  const clearRoles = useRoleStore((state) => state.clearRoles)
  const clearOrganization = useOrganizationStore(
    (state) => state.clearOrganization
  )

  clearUser()
  clearAccount()
  clearOrganization()
  clearRoles()
}

export const storeService = { clearStoreStates }

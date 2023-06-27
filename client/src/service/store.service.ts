import useOrganizationStore from '@/stores/orgainzaionStore'
import useRoleStore from '@/stores/roleStore'
import useUserStore from '@/stores/userStore'

function clearStoreStates() {
  const clearUser = useUserStore((state) => state.clearUser)
  const clearRoles = useRoleStore((state) => state.clearRoles)
  const clearOrganization = useOrganizationStore(
    (state) => state.clearOrganization
  )

  clearUser()
  clearOrganization()
  clearRoles()
}

export const storeService = { clearStoreStates }

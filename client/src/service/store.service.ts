import { Account } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import useAuthStore from '@/stores/authStore'
import useOrganizationStore from '@/stores/organizationStore'
import useRoleStore from '@/stores/roleStore'
import useUserStore from '@/stores/userStore'

function saveToStore(account: Account) {
  useAccountStore.getState().setIsComplete(account.isComplete)
  useUserStore.getState().setUser(account.user)
  useRoleStore.getState().setRoles(account.workspaces.pop()!.roles)
  useOrganizationStore
    .getState()
    .setOrganization(account.workspaces.pop()!.organization)
}

function clearStoreStates() {
  console.log('clearStoreStates()')

  useAccountStore.getState().resetIsComplete()
  useUserStore.getState().clearUser()
  useRoleStore.getState().clearRoles()
  useOrganizationStore.getState().clearOrganization()
  useAuthStore.getState().clearToken()
}

export const storeService = { saveToStore, clearStoreStates }

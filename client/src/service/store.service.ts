import { Account } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import useOrganizationStore from '@/stores/organizationStore'
import useRoleStore from '@/stores/roleStore'
import useUserStore from '@/stores/userStore'

function saveToStore(account: Account) {
  useAccountStore.getState().setIsComplete(account.isComplete)
  useUserStore.getState().setUser(account.user)
  useOrganizationStore
    .getState()
    .setOrganization(account.workspaces.organization)
}

function clearStoreStates() {
  console.log('clearStoreStates()')

  useAccountStore.getState().resetIsComplete()
  useUserStore.getState().clearUser()
  useRoleStore.getState().clearRoles()
  useOrganizationStore.getState().clearOrganization()
}

export const storeService = { saveToStore, clearStoreStates }

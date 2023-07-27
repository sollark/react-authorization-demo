import { Account } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import useAuthStore from '@/stores/authStore'
import useOrganizationStore from '@/stores/organizationStore'
import useRoleStore from '@/stores/roleStore'
import useUserStore from '@/stores/userStore'

function saveAccount(account: Account) {
  console.log('storeService - saveAccount, account :', account)

  const { isComplete, user, workspaces } = account
  const workspace = workspaces.pop()

  useAccountStore.getState().setIsComplete(isComplete)
  useUserStore.getState().setUser(user)
  if (workspace) {
    console.log('storeService - saveAccount, workspace :', workspace)
    useRoleStore.getState().setRoles(workspace.roles)
    useOrganizationStore.getState().setOrganization(workspace.organization)
  }
}

function saveAccessToken(accessToken: string) {
  useAuthStore.getState().setToken(accessToken)
}

function setUserAsAuthorized() {
  useAuthStore.getState().setAsAuthorized()
}

function setUserAsUnauthorized() {
  useAuthStore.getState().setAsUnauthorized()
}

function clearStoreStates() {
  console.log('clearStoreStates()')

  useAccountStore.getState().resetIsComplete()
  useUserStore.getState().clearUser()
  useRoleStore.getState().clearRoles()
  useOrganizationStore.getState().clearOrganization()
  useAuthStore.getState().clearToken()
  useAuthStore.getState().setAsUnauthorized()
}

export const storeService = {
  saveAccount,
  saveAccessToken,
  setUserAsAuthorized,
  setUserAsUnauthorized,
  clearStoreStates,
}

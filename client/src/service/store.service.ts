import { Account } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import useAuthStore from '@/stores/authStore'
import useUserStore from '@/stores/userStore'
import useWorkspaceStore from '@/stores/workspaceStore'

function saveAccount(account: Account) {
  console.log('storeService - saveAccount, account :', account)

  const { isComplete, user, workspace } = account

  useAccountStore.getState().setIsComplete(isComplete)
  useUserStore.getState().setUser(user)

  if (workspace) {
    console.log('storeService - saveAccount, workspace :', workspace)

    useWorkspaceStore.getState().setWorkspace(workspace)
  }
}

function saveAccessToken(accessToken: string) {
  useAuthStore.getState().setToken(accessToken)
}

function setUserAsAuthenticated() {
  useAuthStore.getState().setAsAuthenticated()
}

function setUserAsUnauthenticated() {
  useAuthStore.getState().setAsUnauthenticated()
}

function clearStoreStates() {
  console.log('clearStoreStates()')

  useAccountStore.getState().resetIsComplete()
  useUserStore.getState().clearUser()
  useWorkspaceStore.getState().clearWorkspace()
  useAuthStore.getState().clearToken()
  useAuthStore.getState().setAsUnauthenticated()
}

export const storeService = {
  saveAccount,
  saveAccessToken,
  setUserAsAuthenticated,
  setUserAsUnauthenticated,
  clearStoreStates,
}

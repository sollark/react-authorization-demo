import { Account } from '@/models/Account'
import { EncodedWorkspace, Workspace } from '@/models/Workspace'
import useAccountStore from '@/stores/accountStore'
import useAuthStore from '@/stores/authStore'
import useUserStore from '@/stores/userStore'
import useWorkspaceStore from '@/stores/workspaceStore'
import { codeService } from './code.service'

function saveAccount(account: Account) {
  console.log('storeService - saveAccount, account :', account)

  const { isComplete, user, workspaces } = account

  useAccountStore.getState().setIsComplete(isComplete)
  useUserStore.getState().setUser(user)
  if (workspaces) {
    console.log('storeService - saveAccount, workspaces :', workspaces)

    const decodedWorkspace = codeService.decodeWorkspace(
      workspaces as EncodedWorkspace[]
    )

    // pick the first workspace as active
    const activeWorkspace = decodedWorkspace[0]
    useWorkspaceStore.getState().setWorkspaces(decodedWorkspace as Workspace[])
    useWorkspaceStore
      .getState()
      .setActiveWorkspace(activeWorkspace as Workspace)
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
  useWorkspaceStore.getState().clearWorkspaces()
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

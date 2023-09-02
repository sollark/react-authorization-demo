import { Account } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import useAuthStore from '@/stores/authStore'
import useProfileStore from '@/stores/profileStore'
import useRoleStore from '@/stores/roleStore'
import useWorkspaceStore from '@/stores/workspaceStore'

function saveAccount(account: Account) {
  console.log('storeService - saveAccount, account :', account)

  const { isComplete, profile, workspace, role } = account

  useAccountStore.getState().setIsComplete(isComplete)
  useProfileStore.getState().setProfile(profile)
  useRoleStore.getState().setRole(role.role)

  if (workspace) {
    console.log('storeService - saveAccount, workspace :', workspace)

    useWorkspaceStore.getState().setWorkspace(workspace)
  }
}

function saveAccessToken(accessToken: string) {
  useAuthStore.getState().setToken(accessToken)
}

function setProfileAsAuthenticated() {
  useAuthStore.getState().setAsAuthenticated()
}

function setProfileAsUnauthenticated() {
  useAuthStore.getState().setAsUnauthenticated()
}

function clearStoreStates() {
  console.log('clearStoreStates()')

  useAccountStore.getState().resetIsComplete()
  useProfileStore.getState().clearProfile()
  useWorkspaceStore.getState().clearWorkspace()
  useAuthStore.getState().clearToken()
  useAuthStore.getState().setAsUnauthenticated()
}

export const storeService = {
  saveAccount,
  saveAccessToken,
  setProfileAsAuthenticated,
  setProfileAsUnauthenticated,
  clearStoreStates,
}

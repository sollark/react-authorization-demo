import { Account } from '@/models/Account'
import { RoleCode } from '@/models/Role'
import { Workspace } from '@/models/Workspace'
import useAccountStore from '@/stores/accountStore'
import useAuthStore from '@/stores/authStore'
import useOrganizationStore from '@/stores/organizationStore'
import useRoleStore from '@/stores/roleStore'
import useUserStore from '@/stores/userStore'
import useWorkspaceStore from '@/stores/workspaceStore'

function saveAccount(account: Account) {
  console.log('storeService - saveAccount, account :', account)

  const { isComplete, user, workspaces } = account

  useAccountStore.getState().setIsComplete(isComplete)
  useUserStore.getState().setUser(user)
  if (workspaces) {
    console.log('storeService - saveAccount, workspaces :', workspaces)

    // pick the first workspace as active
    const workspace = workspaces[0]
    useWorkspaceStore.getState().setWorkspaces(workspaces as Workspace[])
    useWorkspaceStore.getState().setActiveWorkspace(workspace as Workspace)

    useOrganizationStore.getState().setOrganization(workspace.organization)
    useRoleStore.getState().setRoles(workspace.roles as RoleCode[])
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
  useRoleStore.getState().clearRoles()
  useOrganizationStore.getState().clearOrganization()
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

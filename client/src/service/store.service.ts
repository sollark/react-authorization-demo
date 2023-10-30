import { Account } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import useAuthStore from '@/stores/authStore'
import useRoleStore from '@/stores/roleStore'
import useProfileStore from '@/stores/userStore'
import useWorkplaceStore from '@/stores/employeeStore'

function saveAccount(account: Account) {
  console.log('storeService - saveAccount, account :', account)

  const { isComplete, profile, workplace, role } = account

  useAccountStore.getState().setIsComplete(isComplete)
  useProfileStore.getState().setProfile(profile)
  useRoleStore.getState().setRole(role)

  if (workplace) {
    console.log('storeService - saveAccount, workplace :', workplace)

    useWorkplaceStore.getState().setWorkplace(workplace)
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

  useRoleStore.getState().clearRole()
  useAccountStore.getState().resetIsComplete()
  useProfileStore.getState().clearProfile()
  useWorkplaceStore.getState().clearWorkplace()
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

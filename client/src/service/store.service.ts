import { Account } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import useAuthStore from '@/stores/authStore'
import useCompanyStore from '@/stores/companyStore'
import { default as useEmployeeStore } from '@/stores/employeeStore'
import useRoleStore from '@/stores/roleStore'
import useProfileStore from '@/stores/userStore'

function saveAccount(account: Account) {
  console.log('storeService - saveAccount, account :', account)

  const { isComplete, profile, employee, role } = account

  useAccountStore.getState().setIsComplete(isComplete)
  useProfileStore.getState().setProfile(profile)
  useRoleStore.getState().setRole(role)

  if (employee) {
    console.log('storeService - saveAccount, employee :', employee)

    const { company } = employee

    useCompanyStore.getState().setCompany(company)
    useEmployeeStore.getState().setEmployee(employee)
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
  useCompanyStore.getState().clearCompany()
  useEmployeeStore.getState().clearEmployee()
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

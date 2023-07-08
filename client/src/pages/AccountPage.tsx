import useOrganizationStore from '@/stores/organizationStore'
import useUserStore from '@/stores/userStore'

const AccountPage = () => {
  const user = useUserStore((state) => state.user)
  const organization = useOrganizationStore((state) => state.organization)
  return (
    <div>
      <h1>Account Page</h1>
      <ul>
        <li>First Name: {user?.firstName}</li>
        <li>Last Name: {user?.lastName}</li>
        <li>Organization: {organization?.organizationName}</li>
      </ul>
    </div>
  )
}

export default AccountPage

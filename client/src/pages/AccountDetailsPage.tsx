import useOrganizationStore from '@/stores/organizationStore'
import useUserStore from '@/stores/userStore'

const AccountDetailsPage = () => {
  console.log('AccountDetailsPage connected')

  const user = useUserStore((state) => state.user)
  const organization = useOrganizationStore((state) => state.organization)

  return (
    <div>
      <ul>
        <li>First Name: {user?.firstName}</li>
        <li>Last Name: {user?.lastName}</li>
        <li>Organization: {organization?.organizationName}</li>
      </ul>
    </div>
  )
}

export default AccountDetailsPage

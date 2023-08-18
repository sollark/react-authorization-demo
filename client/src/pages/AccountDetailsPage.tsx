import SecondaryButton from '@/cmps/button/SecondaryButton'
import useOrganizationStore from '@/stores/organizationStore'
import useUserStore from '@/stores/userStore'
import { useNavigate } from '@tanstack/router'
import { FC } from 'react'

const AccountDetailsPage: FC = () => {
  console.log('AccountDetailsPage connected')

  const navigate = useNavigate({ from: '/account/edit' })

  const user = useUserStore((state) => state.user)
  const organization = useOrganizationStore((state) => state.organization)

  return (
    <>
      <div>
        <ul>
          <li>First Name: {user?.firstName}</li>
          <li>Last Name: {user?.lastName}</li>
          <li>Organization: {organization?.organizationName}</li>
        </ul>
      </div>
      <SecondaryButton onClick={() => navigate({ to: '/account/edit' })}>
        Edit
      </SecondaryButton>
    </>
  )
}

export default AccountDetailsPage

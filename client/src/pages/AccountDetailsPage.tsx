import SecondaryButton from '@/cmps/button/SecondaryButton'
import useProfileStore from '@/stores/userStore'
import useWorkplaceStore from '@/stores/workplaceStore'
import { useNavigate } from '@tanstack/router'
import { FC } from 'react'

const AccountDetailsPage: FC = () => {
  console.log('AccountDetailsPage connected')

  const navigate = useNavigate({ from: '/account/edit' })

  const profile = useProfileStore((state) => state.profile)
  // const company = useOrganizationStore((state) => state.company)
  const workplace = useWorkplaceStore((state) => state.workplace)

  return (
    <>
      <div>
        <h2>Profile</h2>
        First Name: {profile?.firstName}
        <br />
        Last Name: {profile?.lastName}
        <br />
        <h2>Workplace</h2>
        {workplace && `Company: ${workplace.company.companyName}`}
        <br />
        {workplace && `Company code: ${workplace.company.companyCode}`}
        <br />
        {workplace && `Employee number: ${workplace.employeeNumber}`}
        <br />
      </div>
      {/* using href forces a page reload */}
      <SecondaryButton onClick={() => navigate({ to: '/account/edit' })}>
        Edit
      </SecondaryButton>
    </>
  )
}

export default AccountDetailsPage

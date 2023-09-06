import SecondaryButton from '@/cmps/button/SecondaryButton'
import useProfileStore from '@/stores/profileStore'
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
        <ul className='clean-list'>
          <li>First Name: {profile?.firstName}</li>
          <li>Last Name: {profile?.lastName}</li>
          <li>
            workplace:{' '}
            {workplace
              ? `${workplace.company.companyName} ${workplace.company.companyCode} `
              : ''}
          </li>
        </ul>
      </div>
      {/* using href forces a page reload */}
      <SecondaryButton onClick={() => navigate({ to: '/account/edit' })}>
        Edit
      </SecondaryButton>
    </>
  )
}

export default AccountDetailsPage

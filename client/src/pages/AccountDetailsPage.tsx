import SecondaryButton from '@/cmps/button/SecondaryButton'
import useProfileStore from '@/stores/profileStore'
import useWorkspaceStore from '@/stores/workspaceStore'
import { useNavigate } from '@tanstack/router'
import { FC } from 'react'

const AccountDetailsPage: FC = () => {
  console.log('AccountDetailsPage connected')

  const navigate = useNavigate({ from: '/account/edit' })

  const profile = useProfileStore((state) => state.profile)
  // const company = useOrganizationStore((state) => state.company)
  const workspace = useWorkspaceStore((state) => state.workspace)

  return (
    <>
      <div>
        <ul className='clean-list'>
          <li>First Name: {profile?.firstName}</li>
          <li>Last Name: {profile?.lastName}</li>
          <li>
            Workspace:{' '}
            {workspace
              ? `${workspace.company.companyName} ${workspace.company.companyCode} `
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

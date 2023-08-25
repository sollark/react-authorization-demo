import SecondaryButton from '@/cmps/button/SecondaryButton'
import useUserStore from '@/stores/userStore'
import useWorkspaceStore from '@/stores/workspaceStore'
import { useNavigate } from '@tanstack/router'
import { FC } from 'react'

const AccountDetailsPage: FC = () => {
  console.log('AccountDetailsPage connected')

  const navigate = useNavigate({ from: '/account/edit' })

  const user = useUserStore((state) => state.user)
  // const company = useOrganizationStore((state) => state.company)
  const workspaces = useWorkspaceStore((state) => state.workspaces)

  return (
    <>
      <div>
        <ul className='clean-list'>
          <li>First Name: {user?.firstName}</li>
          <li>Last Name: {user?.lastName}</li>
          {workspaces?.map((workspace, index) => {
            return (
              <li key={index}>
                Workspace: {workspace.company.companyName} (
                {workspace.company.companyCode}) ({workspace.roles.join(', ')})
              </li>
            )
          })}
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

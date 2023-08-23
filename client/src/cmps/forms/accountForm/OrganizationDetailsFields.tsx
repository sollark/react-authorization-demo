import useWorkspaceStore from '@/stores/workspaceStore'
import { FC } from 'react'
import Input from '../inputs/TextInput/TextInput'

const OrganizationDetailsFields: FC = () => {
  console.log('OrganizationDetailsFields connected')

  const workspaces = useWorkspaceStore((state) => state.workspaces)
  console.log('workspaces', workspaces)

  return (
    <div>
      <h2>Organization details</h2>
      <h3>Join existing organization or create a new one</h3>
      <Input name='organization' label='Organization' type='text' />

      {workspaces !== null && workspaces.length > 0 && (
        <div>
          <h3>Workspace List:</h3>
          <ul className='clean-list'>
            {workspaces.map((workspace, index) => (
              <li key={index}>
                <strong>Name:</strong> {workspace.organization.organizationName}
                , <strong>Code:</strong>{' '}
                {workspace.organization.organizationCode},{' '}
                <strong>Roles:</strong>{' '}
                {workspace.roles.map((role) => role).join(', ')}
                {/* Edit and Delete buttons */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default OrganizationDetailsFields

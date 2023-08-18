import useWorkspaceStore from '@/stores/workspaceStore'
import { FC } from 'react'
import Input from '../inputs/TextInput/TextInput'

const OrganizationDetailsFields: FC = () => {
  console.log('OrganizationDetailsFields connected')

  const workspaces = useWorkspaceStore((state) => state.workspaces)
  console.log('workspaces', workspaces)

  return (
    <div>
      <h2>Organization Details</h2>
      <h3>Join Existing Organization or Create a New One</h3>
      <Input name='organization' label='Organization' type='text' />

      {workspaces !== null && workspaces.length > 0 && (
        <div>
          <h3>Workspace List:</h3>
          <ul>
            {workspaces.map((workspace, index) => (
              <li key={index}>
                <strong>Name:</strong> {workspace.organization.organizationName}
                , <strong>Code:</strong>{' '}
                {workspace.organization.organizationCode},{' '}
                <strong>Roles:</strong>{' '}
                {/* TODO fix it, server sends array of objects, not strings */}
                {workspace.roles.map((roleObj) => roleObj.role).join(', ')}
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

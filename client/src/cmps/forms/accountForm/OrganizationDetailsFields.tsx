import { FC } from 'react'
import Input from '../inputs/TextInput/TextInput'
import useOrganizationStore from '@/stores/organizationStore'
import useWorkspaceStore from '@/stores/workspaceStore'

const OrganizationDetailsFields: FC = () => {
  console.log('OrganizationDetailsFields connected')

  const workspaces = useWorkspaceStore((state) => state.workspaces)

  return (
    <>
      <h2>Organization details</h2>
      <h3>Join existing organization or create new one</h3>
      <Input name='organization' label='Organization' type='text' />

      {workspaces && (
        <>
          <h3>List:</h3>
          <ul>
            {workspaces.map((workplace, index) => (
              <li key={index}>
                Name: {workplace.organization.organizationName}, Code:
                {workplace.organization.organizationCode}
                Roles: {workplace.roles}
                Edit Delete
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default OrganizationDetailsFields

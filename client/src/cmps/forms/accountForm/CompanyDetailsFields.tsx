import useWorkspaceStore from '@/stores/workspaceStore'
import { FC } from 'react'
import Input from '../inputs/TextInput/TextInput'

const CompanyDetailsFields: FC = () => {
  console.log('CompanyDetailsFields connected')

  const workspaces = useWorkspaceStore((state) => state.workspaces)
  console.log('workspaces', workspaces)

  return (
    <div>
      <h2>Company details</h2>
      <h3>Join existing company or create a new one</h3>
      <Input name='company' label='Company' type='text' />

      {workspaces !== null && workspaces.length > 0 && (
        <div>
          <h3>Workspace List:</h3>
          <ul className='clean-list'>
            {workspaces.map((workspace, index) => (
              <li key={index}>
                <strong>Name:</strong> {workspace.company.companyName},{' '}
                <strong>Code:</strong> {workspace.company.companyCode},{' '}
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

export default CompanyDetailsFields

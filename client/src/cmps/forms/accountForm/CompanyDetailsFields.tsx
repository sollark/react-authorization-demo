import useWorkspaceStore from '@/stores/workspaceStore'
import { FC } from 'react'
import Input from '../inputs/TextInput/TextInput'

const CompanyDetailsFields: FC = () => {
  console.log('CompanyDetailsFields connected')

  const workspace = useWorkspaceStore((state) => state.workspace)

  return (
    <div>
      <h2>Company details</h2>
      <h3>Join existing company or create a new one</h3>
      <Input name='company' label='Company' type='text' />

      {workspace !== null && (
        <div>
          <h3>Workspace List:</h3>
          <ul className='clean-list'>
            <li>
              Workspace:{' '}
              {workspace
                ? `${workspace.company.companyName} ${workspace.company.companyCode} `
                : ''}
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default CompanyDetailsFields

import { FC } from 'react'
import Input from '../inputs/TextInput/TextInput'
import useWorkplaceStore from '@/stores/workplaceStore'

const CompanyDetailsFields: FC = () => {
  console.log('CompanyDetailsFields connected')

  const workplace = useWorkplaceStore((state) => state.workplace)

  return (
    <div>
      <h2>Company</h2>
      <Input name='companyName' label='Company' type='text' />
      <Input name='department' label='Department' type='text' />

      {workplace !== null && (
        <div>
          <h3>Workplace:</h3>
          {workplace &&
            `${workplace.company.companyName} ${workplace.company.companyId} `}
        </div>
      )}
    </div>
  )
}

export default CompanyDetailsFields

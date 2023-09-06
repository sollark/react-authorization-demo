import useWorkplaceStore from '@/stores/workplaceStore'
import { FC } from 'react'
import Input from '../inputs/TextInput/TextInput'

const CompanyDetailsFields: FC = () => {
  console.log('CompanyDetailsFields connected')

  const workplace = useWorkplaceStore((state) => state.workplace)

  return (
    <div>
      <h2>Company details</h2>
      <h3>Join existing company or create a new one</h3>
      <Input name='company' label='Company' type='text' />

      {workplace !== null && (
        <div>
          <h3>Workplace:</h3>
          {workplace &&
            `${workplace.company.companyName} ${workplace.company.companyCode} `}
        </div>
      )}
    </div>
  )
}

export default CompanyDetailsFields

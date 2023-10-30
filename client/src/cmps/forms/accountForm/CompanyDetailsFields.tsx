import useWorkplaceStore from '@/stores/employeeStore'
import { FC } from 'react'
import Input from '../inputs/TextInput/TextInput'

const CompanyDetailsFields: FC = () => {
  console.log('CompanyDetailsFields connected')

  const workplace = useWorkplaceStore((state) => state.workplace)

  return (
    <div>
      <h2>Company</h2>
      <Input name='companyName' label='Company' type='text' />
      <Input name='departmentName' label='Department' type='text' />

      {workplace !== null && (
        <div>
          <h3>Workplace:</h3>
          {workplace &&
            `${workplace.company.companyName} (${workplace.company.companyId}) `}
          {workplace && `${workplace.department?.departmentName}`}
        </div>
      )}
    </div>
  )
}

export default CompanyDetailsFields

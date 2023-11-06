import useEmployeeStore from '@/stores/employeeStore'
import { FC } from 'react'
import Input from '../inputs/TextInput/TextInput'

const CompanyDetailsFields: FC = () => {
  console.log('CompanyDetailsFields connected')

  const employee = useEmployeeStore((state) => state.employee)

  return (
    <div>
      <h2>Company</h2>
      <Input name='companyName' label='Company' type='text' />
      <Input name='departmentName' label='Department' type='text' />

      {employee !== null && (
        <div>
          <h3>Employee:</h3>
          {employee &&
            `${employee.company.companyName} (${employee.company.companyNumber}) `}
          {employee && `${employee.department?.departmentName}`}
        </div>
      )}
    </div>
  )
}

export default CompanyDetailsFields

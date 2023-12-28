import { log } from '@/service/console.service'
import useEmployeeStore from '@/stores/employeeStore'
import { FC } from 'react'
import Input from '../inputs/TextInput/TextInput'

const CompanyDetailsFields: FC = () => {
  log('CompanyDetailsFields connected')

  const employee = useEmployeeStore((state) => state.employee)

  return (
    <div>
      <h2>Company</h2>
      <Input name='companyName' label='Company' type='text' />
      <Input name='departmentName' label='Department' type='text' />
      <Input name='position' label='Position' type='text' />

      {employee !== null && (
        <div>
          <h3>Employee:</h3>
          {employee &&
            `${employee.company.companyName} (${employee.company.companyNumber}) `}
          {employee && `${employee.department?.departmentName}`}
          {employee && `${employee.position}`}
        </div>
      )}
    </div>
  )
}

export default CompanyDetailsFields

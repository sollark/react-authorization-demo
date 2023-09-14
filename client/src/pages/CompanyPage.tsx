import EmployeeTable from '@/cmps/tables/EmployeeTable'
import { FC } from 'react'

const CompanyPage: FC = () => {
  return (
    <div>
      <h1>Company Page</h1>
      <EmployeeTable />
    </div>
  )
}

export default CompanyPage

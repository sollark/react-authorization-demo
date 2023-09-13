import Table from '@/cmps/table/Table'
import { FC } from 'react'
import employeeData from '../assets/mock_data/employee.json'

export type Employee = {
  firstName: string
  lastName: string
  company: string
  department: string
  position: string
  role: string
  status: string
}

const employeeColumns = [
  { field: 'firstName', headerName: 'First name' },
  { field: 'lastName', headerName: 'Last name' },
  { field: 'company', headerName: 'Company' },
  { field: 'department', headerName: 'Department' },
  { field: 'position', headerName: 'Position' },
  { field: 'role', headerName: 'Role' },
  { field: 'status', headerName: 'Status' },
]

const CompanyPage: FC = () => {
  return (
    <div>
      <h1>Company Page</h1>
      <Table dataRows={employeeData} tableColumns={employeeColumns} />
    </div>
  )
}

export default CompanyPage

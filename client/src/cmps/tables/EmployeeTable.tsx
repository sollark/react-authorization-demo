import { FC } from 'react'
import employeeData from '../../assets/mock_data/employee.json'
import Table from './Table'

export type Employee = {
  firstName: string
  lastName: string
  company: string
  department: string
  position: string
  role: string
  status: string
}

const employeeDefaultValues: Employee = {
  firstName: '',
  lastName: '',
  company: '',
  department: '',
  position: '',
  role: '',
  status: '',
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

const employeeActionColumn = [{ field: 'action', headerName: 'Action' }]

const EmployeeTable: FC = () => {
  const columns = [...employeeColumns, ...employeeActionColumn]
  return (
    <div>
      <h2>Employee Table</h2>
      <Table
        dataRows={employeeData}
        defaultValues={employeeDefaultValues}
        tableColumns={columns}
      />
    </div>
  )
}

export default EmployeeTable

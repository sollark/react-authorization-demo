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

const peopleColumns = [
  { field: 'firstName', headerName: 'First name' },
  { field: 'lastName', headerName: 'Last name' },
  { field: 'company', headerName: 'Company' },
  { field: 'department', headerName: 'Department' },
  { field: 'position', headerName: 'Position' },
  { field: 'role', headerName: 'Role' },
  { field: 'status', headerName: 'Status' },
]

const peopleActionColumn = [{ field: 'action', headerName: 'Action' }]

const PeopleTable: FC = () => {
  const columns = [...peopleColumns, ...peopleActionColumn]
  return (
    <div>
      <h2>People Table</h2>
      <Table dataRows={employeeData} tableColumns={columns} />
    </div>
  )
}

export default PeopleTable

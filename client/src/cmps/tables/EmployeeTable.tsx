import { adaptTableRowToObject } from '@/service/utils.service'
import { GridRowId, GridRowModel } from '@mui/x-data-grid'
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
  // { field: 'company', headerName: 'Company' },
  { field: 'department', headerName: 'Department' },
  { field: 'position', headerName: 'Position' },
  { field: 'role', headerName: 'Role' },
  { field: 'status', headerName: 'Status' },
]

// const employeeActionColumn = [{ field: 'action', headerName: 'Action' }]

function updateEmployee(row: GridRowModel) {
  console.log('updateEmployee', row)

  const employee = adaptTableRowToObject<Employee>(row)
  console.log('employee', employee)
}

function deleteEmployee(id: GridRowId) {
  console.log('deleteEmployee', id)
}

const EmployeeTable: FC = () => {
  const columns = [...employeeColumns]
  return (
    <div>
      <h2>Employee Table</h2>
      <Table
        dataRows={employeeData}
        defaultValues={employeeDefaultValues}
        tableColumns={columns}
        updateRow={updateEmployee}
        deleteRow={deleteEmployee}
      />
    </div>
  )
}

export default EmployeeTable

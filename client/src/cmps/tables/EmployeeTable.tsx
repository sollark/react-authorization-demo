import { adaptTableRowToObject } from '@/service/utils.service'
import { workplaceService } from '@/service/workplace.service'
import { GridColDef, GridRowId, GridRowModel } from '@mui/x-data-grid'
import { FC } from 'react'
import employeeData from './../../assets/mock_data/employee.json'
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

const employeeColumns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name', editable: true },
  { field: 'lastName', headerName: 'Last name', editable: true },
  { field: 'department', headerName: 'Department', editable: true },
  { field: 'position', headerName: 'Position', editable: true },
  { field: 'role', headerName: 'Role', editable: true },
  { field: 'status', headerName: 'Status', editable: true },
]

async function updateEmployee(row: GridRowModel): Promise<boolean> {
  console.log('updateEmployee', row)

  const employee = adaptTableRowToObject<Employee>(row)
  console.log('employee', employee)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false) // Resolves the promise after 5 seconds
    }, 5000) // 5000 milliseconds = 5 seconds
  })
}

function deleteEmployee(id: GridRowId) {
  console.log('deleteEmployee', id)
}

const EmployeeTable: FC = () => {
  const employee = workplaceService.getAllEmployees()

  console.log('employeeData from api', employee)

  return (
    <div>
      <h2>Employee Table</h2>
      <Table
        dataRows={employeeData}
        defaultValues={employeeDefaultValues}
        tableColumns={employeeColumns}
        updateRow={updateEmployee}
        deleteRow={deleteEmployee}
      />
    </div>
  )
}

export default EmployeeTable

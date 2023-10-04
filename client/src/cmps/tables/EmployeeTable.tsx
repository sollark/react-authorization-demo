import { ACCOUNT_STATUS, Status } from '@/models/Account'
import { Role, USER_ROLE } from '@/models/Role'
import { adaptTableRowToObject } from '@/service/utils.service'
import { workplaceService } from '@/service/workplace.service'
import { GridColDef, GridRowId, GridRowModel } from '@mui/x-data-grid'
import { FC } from 'react'
import employeeData from './../../assets/mock_data/employee.json'
import Table from './Table'

export type Employee = {
  firstName: string
  lastName: string
  departmentName: string
  position: string
  role: Role
  status: Status
}

const employeeDefaultValues: Employee = {
  firstName: '',
  lastName: '',
  departmentName: '',
  position: '',
  role: USER_ROLE.user,
  status: ACCOUNT_STATUS.unregistered,
}

const employeeColumns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name', editable: true },
  { field: 'lastName', headerName: 'Last name', editable: true },
  { field: 'departmentName', headerName: 'Department', editable: true },
  { field: 'position', headerName: 'Position', editable: true },
  { field: 'role', headerName: 'Role', editable: true },
  { field: 'status', headerName: 'Status', editable: true },
]

async function updateEmployee(row: GridRowModel): Promise<boolean> {
  console.log('updateEmployee', row)

  const employee = adaptTableRowToObject<Employee>(row)
  console.log('employee', employee)

  // const res = await workplaceService.updateEmployee(employee)

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

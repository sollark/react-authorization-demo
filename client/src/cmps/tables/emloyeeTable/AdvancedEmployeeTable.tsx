import { ACCOUNT_STATUS, Role, Status, USER_ROLE } from '@/models/Account'
import { Employee } from '@/models/Employee'
import { GridColDef, GridRowId, GridRowModel } from '@mui/x-data-grid'
import { FC } from 'react'
import Table from '../Table'

/*
 * AdvancedEmployeeTable has full info about employee
 * AdvancedEmployeeTable is not editable
 */

type EmployeeTableProps = {
  employees: Employee[] | null
  departmentOptions: string[]
}

type EmployeeTableColumns = {
  firstName: string
  lastName: string
  ID: string
  departmentName: string
  employeeNumber: string
  position: string
  role: Role
  status: Status
}

const employeeDefaultValues: EmployeeTableColumns = {
  firstName: '',
  lastName: '',
  ID: '',
  departmentName: '',
  employeeNumber: '',
  position: '',
  role: USER_ROLE.user,
  status: ACCOUNT_STATUS.pending,
}

const employeeColumns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name' },
  { field: 'lastName', headerName: 'Last name' },
  { field: 'ID', headerName: 'ID' },
  { field: 'departmentName', headerName: 'Department' },
  { field: 'employeeNumber', headerName: 'Employee number' },
  { field: 'position', headerName: 'Position' },
  // { field: 'role', headerName: 'Role' },
  // { field: 'status', headerName: 'Status' },
]

async function updateEmployee(row: GridRowModel): Promise<boolean> {
  // advanced table cant be updated
  return true
}

function deleteEmployee(id: GridRowId) {
  // advanced table has not option to deleted data
  return true
}

const AdvancedEmployeeTable: FC<EmployeeTableProps> = (props) => {
  const { employees, departmentOptions } = props
  console.log('prop from api', props)

  const employeeData = employees?.map((employee) => {
    return {
      firstName: employee.profile.firstName,
      lastName: employee.profile.lastName,
      ID: employee.profile.ID,
      departmentName: employee.department.departmentName,
      employeeNumber: employee.employeeNumber,
      position: employee.position,
      // role: employee.account.role,
      // status: employee.account.status,
    }
  })

  return (
    <div>
      <h2>Employee Table</h2>
      <Table
        dataRows={employeeData as any}
        defaultValues={employeeDefaultValues}
        tableColumns={employeeColumns}
        updateRow={updateEmployee}
        deleteRow={deleteEmployee}
      />
    </div>
  )
}

export default AdvancedEmployeeTable

import { ACCOUNT_STATUS, Status } from '@/models/Account'
import { Employee } from '@/models/Employee'
import { Role, USER_ROLE } from '@/models/Role'
import { adaptTableRowToObject } from '@/service/utils.service'
import { GridColDef, GridRowId, GridRowModel } from '@mui/x-data-grid'
import { FC } from 'react'
import Table from './Table'

type EmployeeTableProps = {
  employees: Employee[] | null
}

export type EmployeeTableColumns = {
  firstName: string // profile
  lastName: string // profile
  ID: string // profile
  companyName: string // employee.company.companyName
  departmentName: string // employee.department.departmentName
  employeeNumber: string // employee
  position: string // employee
  role: Role // account
  status: Status // account
}

const employeeDefaultValues: EmployeeTableColumns = {
  firstName: '',
  lastName: '',
  ID: '',
  companyName: '',
  departmentName: '',
  employeeNumber: '',
  position: '',
  role: USER_ROLE.user,
  status: ACCOUNT_STATUS.pending,
}

const employeeColumns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name', editable: true },
  { field: 'lastName', headerName: 'Last name', editable: true },
  { field: 'ID', headerName: 'ID', editable: true },
  // { field: 'companyName', headerName: 'Company', editable: false },
  { field: 'departmentName', headerName: 'Department', editable: true },
  { field: 'employeeNumber', headerName: 'Employee number', editable: false },
  { field: 'position', headerName: 'Position', editable: true },
  // { field: 'role', headerName: 'Role', editable: true },
  // { field: 'status', headerName: 'Status', editable: true },
]

async function updateEmployee(row: GridRowModel): Promise<boolean> {
  console.log('updateEmployee', row)

  const employee = adaptTableRowToObject<EmployeeTableColumns>(row)
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

const EmployeeTable: FC<EmployeeTableProps> = (props) => {
  const { employees } = props
  console.log('prop from api', props)
  const employeeData = employees?.map((employee) => {
    return {
      firstName: employee.profile.firstName,
      lastName: employee.profile.lastName,
      ID: employee.profile.ID,
      // companyName: employee.company.companyName,
      departmentName: employee.department.departmentName,
      employeeNumber: employee.employeeNumber,
      position: employee.position,
      // role: employee.account.role,
      // status: employee.account.status,
    }
  })

  console.log('employeeData from api', employeeData)

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

export default EmployeeTable

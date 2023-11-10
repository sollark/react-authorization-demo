import { ACCOUNT_STATUS, Status } from '@/models/Account'
import { Employee } from '@/models/Employee'
import { Role, USER_ROLE } from '@/models/Role'
import { employeeService } from '@/service/employee.service'
import { adaptTableRowToObject } from '@/service/utils.service'
import {
  GridColDef,
  GridRowId,
  GridRowModel,
  GridValueOptionsParams,
} from '@mui/x-data-grid'
import { FC } from 'react'
import Table from '../Table'

/*
 * EditableEmployeeTable has full info about employee
 * EditableEmployeeTable is editable
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

let departments: (params: GridValueOptionsParams<any>) => string[]

const employeeColumns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name', editable: true },
  { field: 'lastName', headerName: 'Last name', editable: true },
  { field: 'ID', headerName: 'ID', editable: true },
  {
    field: 'departmentName',
    headerName: 'Department',
    editable: true,
    type: 'singleSelect',
    valueOptions: (params) => departments(params),
  },
  { field: 'employeeNumber', headerName: 'Employee number', editable: false },
  { field: 'position', headerName: 'Position', editable: true },
  // { field: 'role', headerName: 'Role', editable: true },
  // { field: 'status', headerName: 'Status', editable: true },
]

async function updateEmployee(row: GridRowModel): Promise<boolean> {
  console.log('updateEmployee', row)

  const rowData = adaptTableRowToObject<EmployeeTableColumns>(row)
  console.log('employee row', rowData)
  const { firstName, lastName, ID, departmentName, position } = rowData

  const res = await employeeService.updateEmployee(
    firstName,
    lastName,
    ID,
    departmentName,
    position
  )

  return true
}

function deleteEmployee(id: GridRowId) {
  console.log('deleteEmployee', id)
}

const EditableEmployeeTable: FC<EmployeeTableProps> = (props) => {
  const { employees, departmentOptions } = props
  console.log('prop from api', props)

  departments = setOptions(departmentOptions)

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
        editable
      />
    </div>
  )
}

export default EditableEmployeeTable

function setOptions(types: string[]) {
  return function (params: GridValueOptionsParams<any>) {
    const options: string[] = []
    types?.map((type) => options.push(type))
    return options
  }
}

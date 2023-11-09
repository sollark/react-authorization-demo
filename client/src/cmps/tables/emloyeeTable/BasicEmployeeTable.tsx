import { Employee } from '@/models/Employee'
import { GridColDef, GridRowId, GridRowModel } from '@mui/x-data-grid'
import { FC } from 'react'
import Table from '../Table'

/*
 * BasicEmployeeTable has basic info about employee
 * BasicEmployeeTable is not editable
 */

type EmployeeTableProps = {
  employees: Employee[] | null
  departmentOptions: string[]
}

type EmployeeTableColumns = {
  firstName: string
  lastName: string
  departmentName: string
  position: string
}

const employeeDefaultValues: EmployeeTableColumns = {
  firstName: '',
  lastName: '',
  departmentName: '',
  position: '',
}

const employeeColumns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name' },
  { field: 'lastName', headerName: 'Last name' },
  { field: 'departmentName', headerName: 'Department' },
  { field: 'position', headerName: 'Position' },
]

async function updateEmployee(row: GridRowModel): Promise<boolean> {
  // basic table cant be updated
  return true
}

function deleteEmployee(id: GridRowId) {
  // basic table has not option to deleted data
  return true
}

const BasicEmployeeTable: FC<EmployeeTableProps> = (props) => {
  const { employees, departmentOptions } = props

  const employeeData = employees?.map((employee) => {
    return {
      firstName: employee.profile.firstName,
      lastName: employee.profile.lastName,
      departmentName: employee.department.departmentName,
      position: employee.position,
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

export default BasicEmployeeTable

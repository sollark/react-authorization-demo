import { Department } from '@/models/Department'
import { companyService } from '@/service/company.service'
import { employeeService } from '@/service/employee.service'
import { adaptTableRowToObject } from '@/service/utils.service'
import {
  GridColDef,
  GridRowId,
  GridRowModel,
  GridValueOptionsParams,
} from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import Table from '../Table'

type EmployeeTableColumns = {
  firstName: string
  lastName: string
  ID: string
  departmentName: string
  employeeNumber: string
  position: string
}

const employeeDefaultValues: EmployeeTableColumns = {
  firstName: '',
  lastName: '',
  ID: '',
  departmentName: '',
  employeeNumber: '',
  position: '',
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
]

function updateCompanyEmployee(companyNumber: string) {
  return async (row: GridRowModel): Promise<boolean> => {
    console.log(
      `updateEmployee - row: ${JSON.stringify(
        row,
        null,
        2 // Indentation level, adjust as needed
      )}`
    )

    const rowData = adaptTableRowToObject<EmployeeTableColumns>(row)
    console.log('employee table columns: ', rowData)
    const { firstName, lastName, ID, departmentName, position } = rowData

    const res = await employeeService.updateEmployee(
      companyNumber,
      firstName,
      lastName,
      ID,
      departmentName,
      position
    )

    return true
  }
}

function deleteEmployee(id: GridRowId) {
  console.log('deleteEmployee', id)
}

const EditableEmployeeTable: FC = () => {
  // const { employees, departmentOptions } = props

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['company'],
    queryFn: companyService.getAdvancedCompanyData,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data) {
    return <span>Empty data</span>
  }

  const { companyNumber, employees } = data

  const departmentOptions =
    data.departments.map(
      (department: Department) => department.departmentName
    ) || []

  departments = setOptions(departmentOptions)

  const employeeData = employees?.map((employee) => {
    return {
      firstName: employee.profile.firstName,
      lastName: employee.profile.lastName,
      ID: employee.profile.ID,
      departmentName: employee.department.departmentName,
      employeeNumber: employee.employeeNumber,
      position: employee.position,
    }
  })

  console.log('employeeData from api', employeeData)

  const updateEmployee = updateCompanyEmployee(companyNumber)

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

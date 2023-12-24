import { Department } from '@/models/Department'
import { employeeService } from '@/service/employee.service'
import { adaptTableRowToObject } from '@/service/utils.service'
import useCompanyStore from '@/stores/companyStore'
import {
  GridColDef,
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

let departments: (params: GridValueOptionsParams<any>) => string[]

const employeeColumns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name', editable: true, flex: 1 },
  { field: 'lastName', headerName: 'Last name', editable: true, flex: 1 },
  { field: 'ID', headerName: 'ID', editable: true, flex: 1 },
  {
    field: 'departmentName',
    headerName: 'Department',
    editable: true,
    flex: 1,
    type: 'singleSelect',
    valueOptions: (params) => departments(params),
  },
  {
    field: 'employeeNumber',
    headerName: 'Employee number',
    editable: false,
    flex: 1,
  },
  { field: 'position', headerName: 'Position', editable: true, flex: 1 },
]

function updateCompanyEmployee() {
  return async (row: GridRowModel): Promise<boolean> => {
    const rowData = adaptTableRowToObject<EmployeeTableColumns>(row)
    const {
      firstName,
      lastName,
      ID,
      departmentName,
      employeeNumber,
      position,
    } = rowData

    const response = await employeeService.updateCompanyEmployee(
      firstName,
      lastName,
      ID,
      departmentName,
      employeeNumber,
      position
    )

    // TODO return false if error in response
    return true
  }
}

function deleteCompanyEmployee() {
  return async (row: GridRowModel): Promise<boolean> => {
    const rowData = adaptTableRowToObject<EmployeeTableColumns>(row)
    const { employeeNumber } = rowData

    const response = await employeeService.deleteCompanyEmployee(employeeNumber)

    // TODO return false if error in response
    return true
  }
}

async function getDefaultValues() {
  const employeeNumber = await employeeService.getCompanyEmployeeNumber()
  return {
    firstName: '',
    lastName: '',
    ID: '',
    departmentName: '',
    employeeNumber: employeeNumber,
    position: '',
  }
}

const EditableEmployeeTable: FC = () => {
  const companyDepartments = useCompanyStore(
    (state) => state.company?.departments
  )
  if (!companyDepartments) {
    return <span>Error: Departments are not found in the store</span>
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['company'],
    queryFn: employeeService.getCompanyEmployeeAdvancedData,
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

  const employees = data
  const departmentOptions =
    companyDepartments.map(
      (department: Department) => department.departmentName
    ) || []

  departments = setOptions(departmentOptions)

  const employeeData = employees.map((employee) => {
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

  const updateEmployee = updateCompanyEmployee()
  const deleteEmployee = deleteCompanyEmployee()

  return (
    <div>
      <h2>Employee Table</h2>
      <Table
        basicProps={{ dataRows: employeeData, tableColumns: employeeColumns }}
        specialProps={{
          getDefaultValues: getDefaultValues,
          updateRow: updateEmployee,
          deleteRow: deleteEmployee,
        }}
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

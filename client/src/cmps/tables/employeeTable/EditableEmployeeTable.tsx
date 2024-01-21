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
import { useTranslation } from 'react-i18next'
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

    return response ? true : false
  }
}

function deleteCompanyEmployee() {
  return async (row: GridRowModel): Promise<boolean> => {
    const rowData = adaptTableRowToObject<EmployeeTableColumns>(row)
    const { employeeNumber } = rowData

    const response = await employeeService.deleteCompanyEmployee(employeeNumber)

    return response ? true : false
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

  const { t } = useTranslation()
  const employeeColumns: GridColDef[] = [
    {
      field: 'firstName',
      headerName: t('profile.first_name'),
      editable: true,
      flex: 1,
    },
    {
      field: 'lastName',
      headerName: t('profile.last_name'),
      editable: true,
      flex: 1,
    },
    {
      field: 'ID',
      headerName: t('profile.id'),
      editable: true,
      flex: 1,
    },
    {
      field: 'departmentName',
      headerName: t('department.department'),
      editable: true,
      flex: 1,
      type: 'singleSelect',
      valueOptions: (params) => departments(params),
    },
    {
      field: 'employeeNumber',
      headerName: t('employee.employee_number'),
      editable: false,
      flex: 1,
    },
    {
      field: 'position',
      headerName: t('employee.position'),
      editable: true,
      flex: 1,
    },
  ]

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['employees'],
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

  const updateEmployee = updateCompanyEmployee()
  const deleteEmployee = deleteCompanyEmployee()

  return (
    <div>
      <h2>{t('employees_page.employee_table')}</h2>
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

import { companyService } from '@/service/company.service'
import { GridColDef } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import Table from '../Table'

/*
 * AdvancedEmployeeTable has full info about employees
 * AdvancedEmployeeTable is not editable
 */

// type EmployeeTableProps = {
//   employees: Employee[] | null
//   departmentOptions: string[]
// }

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

const employeeColumns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name' },
  { field: 'lastName', headerName: 'Last name' },
  { field: 'ID', headerName: 'ID' },
  { field: 'departmentName', headerName: 'Department' },
  { field: 'employeeNumber', headerName: 'Employee number' },
  { field: 'position', headerName: 'Position' },
]

const AdvancedEmployeeTable: FC = () => {
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

  const employees = data.employees

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

  return (
    <div>
      <h2>Employee Table</h2>
      <Table
        dataRows={employeeData as any}
        defaultValues={employeeDefaultValues}
        tableColumns={employeeColumns}
      />
    </div>
  )
}

export default AdvancedEmployeeTable

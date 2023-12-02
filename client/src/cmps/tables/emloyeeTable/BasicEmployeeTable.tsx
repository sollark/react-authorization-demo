import { companyService } from '@/service/company.service'
import { GridColDef } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import Table from '../Table'

/*
 * BasicEmployeeTable has basic info about employees
 * BasicEmployeeTable is not editable
 */

// type EmployeeTableProps = {
//   employees: Employee[] | null
//   departmentOptions: string[]
// }

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

const BasicEmployeeTable: FC = () => {
  // const { employees, departmentOptions } = props

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['company'],
    queryFn: companyService.getBasicCompanyData,
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
      />
    </div>
  )
}

export default BasicEmployeeTable

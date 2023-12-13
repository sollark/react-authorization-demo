import { companyService } from '@/service/company.service'
import { GridColDef } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import Table from '../Table'

/*
 * BasicEmployeeTable has basic info about employees
 * BasicEmployeeTable is not editable
 */

const employeeColumns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name', flex: 1 },
  { field: 'lastName', headerName: 'Last name', flex: 1 },
  { field: 'departmentName', headerName: 'Department', flex: 1 },
  { field: 'position', headerName: 'Position', flex: 1 },
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
        basicProps={{ dataRows: employeeData, tableColumns: employeeColumns }}
      />
    </div>
  )
}

export default BasicEmployeeTable
import { employeeService } from '@/service/employee.service'
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
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['employees'],
    queryFn: employeeService.getCompanyEmployeeBasicData,
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

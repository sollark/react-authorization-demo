import { employeeService } from '@/service/employee.service'
import { GridColDef } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import Table from '../Table'

/*
 * AdvancedEmployeeTable has full info about employees
 * AdvancedEmployeeTable is not editable
 */

const employeeColumns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name', flex: 1 },
  { field: 'lastName', headerName: 'Last name', flex: 1 },
  { field: 'ID', headerName: 'ID', flex: 1 },
  { field: 'departmentName', headerName: 'Department', flex: 1 },
  { field: 'employeeNumber', headerName: 'Employee number', flex: 1 },
  { field: 'position', headerName: 'Position', flex: 1 },
]

const AdvancedEmployeeTable: FC = () => {
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
        basicProps={{ dataRows: employeeData, tableColumns: employeeColumns }}
      />
    </div>
  )
}

export default AdvancedEmployeeTable

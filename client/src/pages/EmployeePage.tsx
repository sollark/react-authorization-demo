import AdvancedEmployeeTable from '@/cmps/tables/emloyeeTable/AdvancedEmployeeTable'
import BasicEmployeeTable from '@/cmps/tables/emloyeeTable/BasicEmployeeTable'
import EditableEmployeeTable from '@/cmps/tables/emloyeeTable/EditableEmployeeTable'
import { Role } from '@/models/Role'
import { employeeService } from '@/service/employee.service'
import useRoleStore from '@/stores/roleStore'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

const TableViews = {
  Guest: BasicEmployeeTable,
  User: BasicEmployeeTable,
  Supervisor: AdvancedEmployeeTable,
  Manager: EditableEmployeeTable,
  Admin: EditableEmployeeTable,
}

const EmployeePage: FC = () => {
  console.log(' Employee connected')

  const role: Role = useRoleStore((state) => state.role)
  const Table = TableViews[role] || BasicEmployeeTable

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['company'],
    queryFn: () => employeeService.getCompany(),
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

  return (
    <Box
      sx={{
        p: 4,
      }}>
      <h1>Employee page</h1>
      {/* {JSON.stringify(data)} */}
      {data.companyName}
      <Table
        employees={data.employees}
        departmentOptions={
          data.departments.map((department) => department.departmentName) || []
        }
      />
    </Box>
  )
}

export default EmployeePage

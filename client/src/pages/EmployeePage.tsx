import AdvancedEmployeeTable from '@/cmps/tables/emloyeeTable/AdvancedEmployeeTable'
import { employeeService } from '@/service/employee.service'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

const EmployeePage: FC = () => {
  console.log(' Employee connected')

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
      <AdvancedEmployeeTable
        employees={data.employees}
        departmentOptions={
          data.departments.map((department) => department.departmentName) || []
        }
      />
    </Box>
  )
}

export default EmployeePage

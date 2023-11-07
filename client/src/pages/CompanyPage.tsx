import EmployeeTable from '@/cmps/tables/EmployeeTable'
import { employeeService } from '@/service/employee.service'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

// TODO imposable to add new employee through the table
// need big refactor, add new employee form, etc
// clean up the code
const CompanyPage: FC = () => {
  console.log(' Company connected')

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
      <h1>Company page</h1>
      {/* {JSON.stringify(data)} */}
      {data.companyName}
      <EmployeeTable employees={data.employees} />
    </Box>
  )
}

export default CompanyPage

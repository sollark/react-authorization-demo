import EmployeeTable from '@/cmps/tables/EmployeeTable'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'


  const { isPending, isError, data, error } = useQuery({
    queryKey: ['employees'],
    queryFn: () => workplaceService.getAllEmployees(),
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Box
      sx={{
        p: 4,
      }}>
      <h1>Company page</h1>
      <EmployeeTable />
    </Box>
  )
}

export default CompanyPage

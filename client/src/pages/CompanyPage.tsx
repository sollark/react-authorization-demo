import { workplaceService } from '@/service/workplace.service'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

// TODO imposable to add new employee through the table
// need big refactor, add new employee form, etc
// clean up the code
const CompanyPage: FC = () => {
  console.log(' Company connected')

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

  //TODO client gets empty array
  return (
    <Box
      sx={{
        p: 4,
      }}>
      <h1>Company page</h1>
      {JSON.stringify(data)}
      {/* <EmployeeTable employees={data} /> */}
    </Box>
  )
}

export default CompanyPage

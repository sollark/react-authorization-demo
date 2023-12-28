import { companyService } from '@/service/company.service'
import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

const CompanyPage: FC = () => {
  log(' Company connected')

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['company'],
    queryFn: () => companyService.getBasicCompanyData(),
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
      <p>{`Company: ${data.companyName}`}</p>
      <p>{`Company number: ${data.companyNumber}`}</p>
      <p>
        {' '}
        {`Departments:${
          data.departments?.map(
            (department) => '  ' + department.departmentName
          ) || []
        }`}
      </p>
      <p>{`Number of employees: ${data.employees?.length}`}</p>
    </Box>
  )
}

export default CompanyPage

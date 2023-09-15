import EmployeeTable from '@/cmps/tables/EmployeeTable'
import { Box } from '@mui/material'
import { FC } from 'react'

const CompanyPage: FC = () => {
  console.log(' Company connected')
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

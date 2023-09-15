import PeopleTable from '@/cmps/tables/PeopleTable'
import { Box } from '@mui/material'
import { FC } from 'react'

const PeoplePage: FC = () => {
  console.log(' People connected')
  return (
    <Box
      sx={{
        p: 4,
      }}>
      <h1>People page</h1>
      <PeopleTable />
    </Box>
  )
}

export default PeoplePage

import SecondaryButton from '@/cmps/button/SecondaryButton'
import PeopleTable from '@/cmps/tables/PeopleTable'
import { Box } from '@mui/material'
import { FC } from 'react'

const PeoplePage: FC = () => {
  console.log(' People connected')

  async function addPerson() {
    console.log('add person')
  }

  return (
    <Box
      sx={{
        p: 4,
      }}>
      <h1>People page</h1>
      <SecondaryButton onClick={addPerson}>Add person</SecondaryButton>
      <PeopleTable />
    </Box>
  )
}

export default PeoplePage

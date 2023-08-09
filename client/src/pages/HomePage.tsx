import { Box } from '@mui/material'
import { FC } from 'react'

const HomePage: FC = () => {
  console.log('Home connected')

  return (
    <Box
      sx={{
        p: 4,
      }}>
      <h1>Home page</h1>
    </Box>
  )
}

export default HomePage

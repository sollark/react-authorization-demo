import { Box } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { FC } from 'react'

const JoinCompanyPage: FC = () => {
  console.log('JoinCompany connected')

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>Join company</h1>
    </Box>
  )
}

export default JoinCompanyPage

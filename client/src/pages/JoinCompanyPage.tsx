import JoinCompanyForm from '@/cmps/forms/JoinCompanyForm'
import { Box } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { FC } from 'react'

const JoinCompanyPage: FC = () => {
  console.log('JoinCompany connected')

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h2>Join a company</h2>
      <JoinCompanyForm />
      <p>
        Want to create your company?{' '}
        <Link to='/account/edit'>Create a company</Link>
      </p>
    </Box>
  )
}

export default JoinCompanyPage

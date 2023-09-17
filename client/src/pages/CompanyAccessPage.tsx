import CompanyAccessForm from '@/cmps/forms/CompanyAccessForm'
import { Box } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { FC } from 'react'

const CompanyAccessPage: FC = () => {
  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h2>Company Access</h2>
      <CompanyAccessForm />
      <p>
        Want to create your company? <Link to='/account/edit'>Create</Link>
      </p>
    </Box>
  )
}

export default CompanyAccessPage

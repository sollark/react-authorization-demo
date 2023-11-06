import { Box } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { FC } from 'react'
import RegistrationForm from '../cmps/forms/RegistrationForm'

const CreateCompanyPage: FC = () => {
  console.log('CreateCompany connected')

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>Create company</h1>
      <RegistrationForm />
    </Box>
  )
}

export default CreateCompanyPage

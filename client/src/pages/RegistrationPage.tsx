import CustomLink from '@/cmps/link/CustomLink'
import { Box } from '@mui/material'
import { FC } from 'react'
import RegistrationForm from '../cmps/forms/RegistrationForm'

const RegistrationPage: FC = () => {
  console.log('Registration connected')

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>Registration</h1>
      <RegistrationForm />
      <p>
        Already have an account? <CustomLink to='/signin'>Sign in</CustomLink>
      </p>
    </Box>
  )
}

export default RegistrationPage

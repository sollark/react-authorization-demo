import { Box } from '@mui/material'
import { Link } from '@tanstack/router'
import { FC } from 'react'
import RegistrationForm from './form/RegistrationForm'

const Registration: FC = () => {
  console.log('Registration connected')

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>Registration</h1>
      <RegistrationForm />
      <p>
        Already have an account? <Link to='/auth/signin'>Sign in</Link>
      </p>
    </Box>
  )
}

export default Registration

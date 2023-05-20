import { Box } from '@mui/material'
import { Link } from '@tanstack/router'
import { FC } from 'react'
import SignInForm from './form/SignInForm'

const Signin: FC = () => {
  console.log('Signin connected')

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>Sign In</h1>
      <SignInForm />
      <p>
        Don't have an account? <Link to='/auth/registration'>Registration</Link>
      </p>
    </Box>
  )
}

export default Signin

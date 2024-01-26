import CustomLink from '@/cmps/link/CustomLink'
import TestSignIn from '@/cmps/testSignIn/testSignIn'
import { log } from '@/service/console.service'
import { Box } from '@mui/material'
import { FC } from 'react'
import SignInForm from '../cmps/forms/SignInForm'

const SigninPage: FC = () => {
  log('Signin connected')

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>Sign In</h1>
      <SignInForm />
      <p>
        Don't have an account?{' '}
        <CustomLink to='/registration'>Registration</CustomLink>
      </p>
      <TestSignIn />
    </Box>
  )
}

export default SigninPage

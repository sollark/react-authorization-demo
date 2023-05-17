import { SignInSchema } from '@/models/Auth'
import { authService } from '@/service/auth.service'
import { Box } from '@mui/material'
import { Link } from '@tanstack/router'
import { FC } from 'react'
import Form from './form/Form'
import SignInForm from './form/SignInForm'

interface SigninForm {
  email: string
  password: string
}

const defaultValues = {
  email: '',
  password: '',
}

const Signin: FC = () => {
  console.log('Signin connected')

  async function submit(form: Object) {
    console.log('Signin form submitted: ', form)

    const { email, password } = form as SigninForm

    const response = authService.signIn(email, password)

    console.log('Signin response: ', response)
  }

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>Sign in</h1>
      <Form
        schema={SignInSchema}
        defaultValues={defaultValues}
        submit={submit}
        buttonText='Sign In'>
        <SignInForm />
      </Form>
      <p>
        Don't have an account? <Link to='/auth/registration'>Registration</Link>
      </p>
    </Box>
  )
}

export default Signin

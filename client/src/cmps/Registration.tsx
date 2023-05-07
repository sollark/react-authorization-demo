import { Box } from '@mui/material'
import { Link } from '@tanstack/router'
import { FC } from 'react'
import Form from './form/Form'
import Input from './form/TextInput'
import { authService } from '@/service/auth.service'

interface RegistrationForm {
  email: string
  password: string
  confirmedPassword: string
}

const Registration: FC = () => {
  console.log('Registration connected')

  async function submit(form: Object) {
    console.log('Registration form submitted: ', form)

    const { email, password, confirmedPassword } = form as RegistrationForm

    if (password !== confirmedPassword) {
      console.log('Password and confirmed password do not match')
      return
    }

    const response = await authService.registration(email, password)

    console.log('Registration response: ', response)
  }

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>Registration</h1>
      <Form submit={submit}>
        <Input name={'email'} label={'Email'} type='text' />
        <Input name={'password'} label={'Password'} />
        <Input name={'confirmedPassword'} label={'Confirm password'} />
      </Form>
      <p>
        Already have an account? <Link to='/auth/signin'>Sign in</Link>
      </p>
    </Box>
  )
}

export default Registration

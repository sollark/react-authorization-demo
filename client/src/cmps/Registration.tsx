import { authService } from '@/service/auth.service'
import { Box } from '@mui/material'
import { Link } from '@tanstack/router'
import { FC } from 'react'
import { z } from 'zod'
import Form from './form/Form'
import Input from './form/TextInput'

interface RegistrationForm {
  email: string
  password: string
  confirmedPassword: string
}

const schema = z
  .object({
    email: z
      .string()
      .trim()
      .nonempty({ message: 'Field can not be empty' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string()
      .trim()
      .nonempty({ message: 'Field can not be empty' })
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmedPassword: z
      .string()
      .trim()
      .nonempty({ message: 'Field can not be empty' })
      .min(6, { message: 'Password must be at least 6 characters' }),
  })
  .superRefine(({ confirmedPassword, password }, ctx) => {
    if (confirmedPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmedPassword'],
      })
    }
  })

const defaultValues = {
  email: '',
  password: '',
  confirmedPassword: '',
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
      <Form
        schema={schema}
        defaultValues={defaultValues}
        submit={submit}
        buttonText='Registration'>
        <Input name={'email'} label={'Email'} type='email' />
        <Input name={'password'} label={'Password'} type='password' />
        <Input
          name={'confirmedPassword'}
          label={'Confirm password'}
          type='password'
        />
      </Form>
      <p>
        Already have an account? <Link to='/auth/signin'>Sign in</Link>
      </p>
    </Box>
  )
}

export default Registration

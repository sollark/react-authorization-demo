import { authService } from '@/service/auth.service'
import { useNavigate } from '@tanstack/router'
import { useState } from 'react'
import { z } from 'zod'
import ErrorMessage from './ErrorMessage'
import Form from './Form'
import SubmitButton from './buttons/SubmitButton'
import Input from './inputs/TextInput/TextInput'

interface RegistrationForm {
  email: string
  password: string
}

const defaultValues = {
  email: '',
  password: '',
  confirmedPassword: '',
}

const RegistrationSchema = z
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
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(20, { message: 'Password must be less than 20 characters' }),
    confirmedPassword: z
      .string()
      .trim()
      .nonempty({ message: 'Field can not be empty' })
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(20, { message: 'Password must be less than 20 characters' }),
  })
  .refine(({ confirmedPassword, password }) => confirmedPassword === password, {
    message: 'Passwords do not match',
    path: ['confirmedPassword'],
  })

const RegistrationForm = () => {
  console.log('RegistrationForm connected')

  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  async function submit(form: RegistrationForm) {
    console.log('Registration form submitted: ', form)

    const { email, password } = form
    setErrorMessage('')

    try {
      const account = await authService.registration(email, password)

      if (account?.isComplete) navigate({ to: '/' })
      else navigate({ to: '/account/edit' })
    } catch (error: any) {
      console.log(error)
      setErrorMessage(error.response.data.errors[0].message)
    }
  }

  return (
    <Form
      schema={RegistrationSchema}
      defaultValues={defaultValues}
      submit={submit}
      submitButton={<SubmitButton />}>
      <Input name='email' label='Email' type='email' />
      <Input name='password' label='Password' type='password' />
      <Input
        name='confirmedPassword'
        label='Confirm password'
        type='password'
      />
      <ErrorMessage message={errorMessage} />
    </Form>
  )
}

export default RegistrationForm

import { authService } from '@/service/auth.service'
import { useNavigate } from '@tanstack/router'
import { FC } from 'react'
import { z } from 'zod'
import Form from './Form'
import SubmitButton from './buttons/SubmitButton'
import Input from './inputs/TextInput'

interface SigninForm {
  email: string
  password: string
}

const defaultValues = {
  email: '',
  password: '',
}

const SignInSchema = z.object({
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
})

const SignInForm: FC = () => {
  console.log('SignInForm connected')

  const navigate = useNavigate()

  async function submit(form: SigninForm) {
    console.log('Signin form submitted: ', form)

    const { email, password } = form

    try {
      const account = await authService.signIn(email, password)

      if (account?.isComplete) navigate({ to: '/' })
      else navigate({ to: '/account' })
    } catch (error) {
      console.log('in SignInForm', error)
    }
  }

  return (
    <Form
      schema={SignInSchema}
      defaultValues={defaultValues}
      submit={submit}
      submitButton={<SubmitButton />}>
      <Input name='email' label='Email' type='email' />
      <Input name='password' label='Password' type='password' />
    </Form>
  )
}

export default SignInForm

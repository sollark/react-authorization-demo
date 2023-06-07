import { SignInSchema } from '@/models/Auth'
import { authService } from '@/service/auth.service'
import { useNavigate } from '@tanstack/router'
import { FC } from 'react'
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

const SignInForm: FC = () => {
  console.log('SignInForm connected')

  const navigate = useNavigate()

  async function submit(form: Object) {
    console.log('Signin form submitted: ', form)

    const { email, password } = form as SigninForm

    const account = await authService.signIn(email, password)

    if (account.isComplete) navigate({ to: '/' })
    else navigate({ to: '/account' })
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

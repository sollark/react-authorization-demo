import { authService } from '@/service/auth.service'
import { FC } from 'react'
import Form from './Form'
import Input from './inputs/TextInput'
import { SignInSchema } from '@/models/Auth'
import SubmitButton from './buttons/SubmitButton'
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

  async function submit(form: Object) {
    console.log('Signin form submitted: ', form)

    const { email, password } = form as SigninForm

    const response = authService.signIn(email, password)
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

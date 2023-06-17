import { RegistrationSchema } from '@/models/Auth'
import { authService } from '@/service/auth.service'
import Form from './Form'
import SubmitButton from './buttons/SubmitButton'
import Input from './inputs/TextInput'
import { useNavigate } from '@tanstack/router'

interface RegistrationForm {
  email: string
  password: string
}

const defaultValues = {
  email: '',
  password: '',
  confirmedPassword: '',
}

const RegistrationForm = () => {
  console.log('RegistrationForm connected')

  const navigate = useNavigate()

  async function submit(form: Object) {
    console.log('Registration form submitted: ', form)

    const { email, password } = form as RegistrationForm

    const account = await authService.registration(email, password)

    if (account.isComplete) navigate({ to: '/' })
    else navigate({ to: '/account' })
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
    </Form>
  )
}

export default RegistrationForm

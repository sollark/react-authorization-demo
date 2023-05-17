import { RegistrationSchema } from '@/models/Auth'
import { authService } from '@/service/auth.service'
import { Box } from '@mui/material'
import { Link } from '@tanstack/router'
import { FC } from 'react'
import AccountForm from './form/AccountForm'
import Form from './form/Form'
import MultistepForm from './form/MultistepForm'
import OrganizationDetailsForm from './form/OrganizationDetailsForm'
import UserDetailsForm from './form/UserDetailsForm'

interface RegistrationForm {
  email: string
  password: string
}

const defaultValues = {
  email: '',
  password: '',
  confirmedPassword: '',
}

const Registration: FC = () => {
  console.log('Registration connected')

  async function submit(form: Object) {
    console.log('Registration form submitted: ', form)

    const { email, password } = form as RegistrationForm

    const response = await authService.registration(email, password)

    console.log('Registration response: ', response)
  }

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>Registration</h1>
      <Form
        schema={RegistrationSchema}
        defaultValues={defaultValues}
        submit={submit}
        buttonText='Registration'>
        <MultistepForm>
          <AccountForm />
          <UserDetailsForm />
          <OrganizationDetailsForm />
        </MultistepForm>
      </Form>
      <p>
        Already have an account? <Link to='/auth/signin'>Sign in</Link>
      </p>
    </Box>
  )
}

export default Registration

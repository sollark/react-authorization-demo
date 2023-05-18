import { Box } from '@mui/material'
import { FC } from 'react'
import AccountForm from './form/AccountForm'
import MultistepForm from './form/MultistepForm'

interface AccountForm {
  // UserDetailForm
  firstName: string
  lastName: string
  phone: string

  // OrganizationDetailsForm
  organization: string
}

const defaultValues = {
  firstName: '',
  lastName: '',
  phone: '',
  organization: '',
}

const Account: FC = () => {
  console.log('Account connected')

  async function submit(form: Object) {
    console.log('Account form submitted: ', form)
  }

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <MultistepForm submit={submit}>
        <AccountForm />
      </MultistepForm>
    </Box>
  )
}

export default Account

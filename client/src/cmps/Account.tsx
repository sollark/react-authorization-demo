import { Box } from '@mui/material'
import { FC } from 'react'
import AccountForm from './form/AccountForm'
import OrganizationDetailsForm from './form/OrganizationDetailsForm'
import UserDetailsForm from './form/UserDetailsForm'

const Account: FC = () => {
  console.log('Account connected')

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <AccountForm>
        <UserDetailsForm />
        <OrganizationDetailsForm />
      </AccountForm>
    </Box>
  )
}

export default Account

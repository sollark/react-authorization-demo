import { Box } from '@mui/material'
import { FC } from 'react'
import AccountForm from './form/AccountForm'
import UserDetailsFields from './form/UserDetailsFields'
import OrganizationDetailsFields from './form/OrganizationDetailsFields'

const Account: FC = () => {
  console.log('Account connected')

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <AccountForm>
        <UserDetailsFields />
        <OrganizationDetailsFields />
      </AccountForm>
    </Box>
  )
}

export default Account

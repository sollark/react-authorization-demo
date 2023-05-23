import { Box } from '@mui/material'
import { FC } from 'react'
import AccountForm from './forms/AccountForm'
import UserDetailsFields from './forms/UserDetailsFields'
import OrganizationDetailsFields from './forms/OrganizationDetailsFields'

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

import AccountForm from '@/cmps/forms/accountForm/AccountForm'
import OrganizationDetailsFields from '@/cmps/forms/accountForm/OrganizationDetailsFields'
import UserDetailsFields from '@/cmps/forms/accountForm/UserDetailsFields'
import { Box } from '@mui/material'
import { FC } from 'react'

const AccountEditPage: FC = () => {
  console.log('AccountEditPage connected')

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <AccountForm>
        <UserDetailsFields />
        <OrganizationDetailsFields />
      </AccountForm>
    </Box>
  )
}

export default AccountEditPage

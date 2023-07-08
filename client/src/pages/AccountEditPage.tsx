import AccountForm from '@/cmps/forms/AccountForm'
import OrganizationDetailsFields from '@/cmps/forms/OrganizationDetailsFields'
import UserDetailsFields from '@/cmps/forms/UserDetailsFields'
import { Box } from '@mui/material'
import { FC } from 'react'

const AccountEditPage: FC = () => {
  console.log('AccountEdit connected')

  return (
    <>
      <Box
        component='article'
        sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
        <AccountForm>
          <UserDetailsFields />
          <OrganizationDetailsFields />
        </AccountForm>
      </Box>
    </>
  )
}

export default AccountEditPage

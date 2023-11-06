import AccountForm from '@/cmps/forms/accountForm/AccountForm'
import CompanyDetailsFields from '@/cmps/forms/accountForm/CompanyDetailsFields'
import UserDetailsFields from '@/cmps/forms/accountForm/UserDetailsFields'
import { Box } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { FC } from 'react'

const AccountEditPage: FC = () => {
  console.log('AccountEdit connected')

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <AccountForm>
        <UserDetailsFields />
        <CompanyDetailsFields />
      </AccountForm>
      <p>
        Want to join your company?{' '}
        <Link to='/account/join'>Join a company</Link>
      </p>
    </Box>
  )
}

export default AccountEditPage

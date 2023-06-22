import Account from '@/cmps/Account'
import { Link } from '@tanstack/router'
import { FC } from 'react'

const AccountPage: FC = () => {
  console.log('Account connected')

  return (
    <div>
      <Link to='/'>Home</Link>
      <Account />
    </div>
  )
}

export default AccountPage

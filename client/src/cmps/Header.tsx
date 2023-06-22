import { FC } from 'react'
import Logo from './Logo'
import useAccountStore from '@/stores/accountStore'
import useUserStore from '@/stores/userStore'
import Navigation from './Navigation'

const Header: FC = () => {
  console.log('Header connected')

  const { isComplete } = useAccountStore()
  const { user } = useUserStore()

  return (
    <header className='app-header'>
      <Logo />
      <Navigation />

      <div className='app-header__user'>
        {user ? user.firstName : 'Not signed in'}
      </div>

      <div className='app-header__account-status'>
        {isComplete ? 'Complete' : 'Your account is not complete'}
      </div>
    </header>
  )
}

export default Header

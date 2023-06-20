import { FC } from 'react'
import Logo from './Logo'
import useAccountStore from '@/stores/accountStore'
import useUserStore from '@/stores/userStore'

const Header: FC = () => {
  console.log('Header connected')

  const { isComplete } = useAccountStore()
  const { user } = useUserStore()

  return (
    <header className='app-header'>
      <Logo />
      <div className='app-header__user'>
        {user ? user.firstName : 'no user'}
      </div>

      <div className='app-header__account-status'>
        {isComplete ? 'Complete' : 'not complete'}
      </div>
    </header>
  )
}

export default Header

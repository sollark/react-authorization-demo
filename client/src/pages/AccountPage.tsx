import Account from '@/cmps/Account'
import Header from '@/cmps/Header'
import useUserStore from '@/stores/userStore'
import { Link } from '@tanstack/router'

export default function AccountPage() {
  console.log('Account connected')

  const { user } = useUserStore()
  const firstName = user?.firstName

  return (
    <div>
      <Header />
      <Link to='/'>Home</Link>
      <Account />
    </div>
  )
}

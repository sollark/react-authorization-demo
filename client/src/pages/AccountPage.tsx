import Account from '@/cmps/Account'
import Header from '@/cmps/Header'
import useAccountStore from '@/stores/accountStore'
import useUserStore from '@/stores/userStore'
import { Link, useNavigate } from '@tanstack/router'
import { useEffect } from 'react'

export default function AccountPage() {
  console.log('Account connected')

  const navigate = useNavigate()
  const { user } = useUserStore()
  const { isComplete } = useAccountStore()

  useEffect(() => {
    if (!user) navigate({ to: '/signin' })
    else if (isComplete) navigate({ to: '/' })
  }, [])

  return (
    <div>
      <Header />
      <Link to='/'>Home</Link>
      <Account />
    </div>
  )
}

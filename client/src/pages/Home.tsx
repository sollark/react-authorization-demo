import Header from '@/cmps/Header'
import useAccountStore from '@/stores/accountStore'
import useUserStore from '@/stores/userStore'
import { Link, useNavigate } from '@tanstack/router'
import { useEffect } from 'react'

export default function Home() {
  console.log('Home connected')
  const navigate = useNavigate()
  const { isComplete } = useAccountStore()
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    console.log('Home-useEffect user store', user)
    console.log('Home-useEffect account store', isComplete)
    if (!user) navigate({ to: '/auth/signin' })
    else if (!isComplete) navigate({ to: '/account' })
  }, [])

  const firstName = user?.firstName

  return (
    <div>
      <Header />
      <Link to='/account'>Account</Link>
      <Link to='/shift'>Shift</Link>
    </div>
  )
}

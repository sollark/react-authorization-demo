import useAccountStore from '@/stores/accountStore'
import useUserStore from '@/stores/userStore'
import { Link, useNavigate } from '@tanstack/router'
import { useEffect } from 'react'

export default function Home() {
  console.log('Home connected')
  const navigate = useNavigate()
  const { isComplete } = useAccountStore()

  useEffect(() => {
    if (!isComplete) {
      console.log('to account', isComplete)
      navigate({ to: '/account' })
    }
  }, [])

  const { user } = useUserStore()
  const firstName = user?.firstName

  return (
    <div>
      <h1>Hello, {firstName ? firstName : 'Guest'}!</h1>
      <Link to='/account'>Account</Link>
      <Link to='/shift'>Shift</Link>
    </div>
  )
}

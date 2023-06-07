import useUserStore from '@/stores/userStore'
import { Link } from '@tanstack/router'

export default function Account() {
  console.log('Account connected')

  const { user } = useUserStore()
  const firstName = user?.firstName

  return (
    <div>
      <h1>Hello, {firstName ? firstName : 'Guest'}!</h1>
      <Link to='/'>Home</Link>
    </div>
  )
}

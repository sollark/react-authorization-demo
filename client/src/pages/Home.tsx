import useUserStore from '@/stores/userStore'
import { Link } from '@tanstack/router'

export default function Home() {
  console.log('Home connected')

  const { user } = useUserStore()
  const firstName = user?.firstName

  return (
    <div>
      <h1>Hello, {firstName ? firstName : 'Guest'}!</h1>
      <Link to='/auth'>Auth</Link>
      <Link to='/shift'>Shift</Link>
    </div>
  )
}

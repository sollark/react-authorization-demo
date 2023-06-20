import Header from '@/cmps/Header'
import { Link, Outlet } from '@tanstack/router'

export default function Auth() {
  console.log('Auth connected')
  return (
    <div>
      <Header />
      <Link to='/auth/signin'>Signin</Link>
      <Link to='/auth/registration'>Registration</Link>
      <Outlet />
    </div>
  )
}

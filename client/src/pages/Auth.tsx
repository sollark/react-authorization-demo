import { Outlet } from '@tanstack/router'

export default function Auth() {
  console.log('Auth connected')
  return (
    <div>
      <h1>Auth</h1>
      <Outlet />
    </div>
  )
}

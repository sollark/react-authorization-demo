import { Outlet } from '@tanstack/router'

export default function Auth() {
  console.log('Auth connected')
  return (
    <div>
      <Outlet />
    </div>
  )
}

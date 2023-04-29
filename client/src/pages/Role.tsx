import { Outlet } from '@tanstack/router'

export default function Role() {
  console.log('Role connected')
  return (
    <>
      <div>Role</div>
      <Outlet />
    </>
  )
}

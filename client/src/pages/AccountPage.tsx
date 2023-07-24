import { Outlet } from '@tanstack/router'

const AccountPage = () => {
  console.log('AccountPage connected')

  return (
    <div>
      <h1>Account Page</h1>
      <Outlet />
    </div>
  )
}

export default AccountPage

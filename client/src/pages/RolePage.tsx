import { Link, Outlet } from '@tanstack/router'
import { FC } from 'react'

const RolePage: FC = () => {
  console.log('Role connected')

  return (
    <>
      <div>
        <h1>Role</h1>
        <Link to='/role/guest'>Guest</Link>
        <Link to='/role/employee'>Employee</Link>
        <Link to='/role/manager'>Manager</Link>
        <Link to='/role/supervisor'>Supervisor</Link>
        <Link to='/role/admin'>Admin</Link>
      </div>
      <Outlet />
    </>
  )
}

export default RolePage

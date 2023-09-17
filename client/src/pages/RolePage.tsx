import { Box } from '@mui/material'
import { Link, Outlet } from '@tanstack/react-router'
import { FC } from 'react'

const RolePage: FC = () => {
  console.log('Role connected')

  return (
    <Box
      sx={{
        p: 4,
      }}>
      <div>
        <h1>Role page</h1>
        <h3>Role navigation</h3>
        <Link to='/role/employee'>Employee</Link>
        {'  '}
        <Link to='/role/manager'>Manager</Link>
        {'  '}
        <Link to='/role/supervisor'>Supervisor</Link>
        {'  '}
        <Link to='/role/admin'>Admin</Link>
        {'  '}
      </div>
      <Outlet />
    </Box>
  )
}

export default RolePage

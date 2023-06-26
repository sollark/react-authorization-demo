import { authService } from '@/service/auth.service'
import useRoleStore from '@/stores/roleStore'
import useUserStore from '@/stores/userStore'
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { yellow } from '@mui/material/colors'
import { Link } from '@tanstack/router'
import React, { ReactNode, useEffect } from 'react'

interface UserProps {
  anchorElUser: null | HTMLElement
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseUserMenu: () => void
}

const userMenu = [
  { key: 'Profile', link: <Link to='/profile'>Profile</Link> },
  { key: 'Account', link: <Link to='/account'>Account</Link> },
  {
    key: 'Logout',
    link: (
      <Link onClick={() => authService.signOut()} to='/'>
        Logout
      </Link>
    ),
  },
]

const guestMenu = [
  {
    key: 'SignIn',
    link: <Link to='/signin'>Sign in</Link>,
  },
]

const menu: Array<{ key: string; link: ReactNode }> = []

const User = (props: UserProps) => {
  const { anchorElUser, handleOpenUserMenu, handleCloseUserMenu } = props

  const { user } = useUserStore()
  const roles = useRoleStore((state) => state.roles)

  useEffect(() => {
    console.log('useEffect')
    menu.length = 0

    if (user) menu.push(...userMenu)
    else menu.push(...guestMenu)
  }, [])

  return (
    <>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt='Avatar'
            src=''
            sx={{
              bgcolor: yellow[600],
              color: 'black',
              width: 56,
              height: 56,
            }}>
            {user?.firstName[0]?.toUpperCase()}
            {user?.lastName[0]?.toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        {menu.map((menuItem) => (
          <MenuItem key={menuItem.key} onClick={handleCloseUserMenu}>
            <Typography textAlign='center'>{menuItem.link}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default User

import { authService } from '@/service/auth.service'
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
  { key: 'Account', link: <Link to='/account'>Account</Link> },
  {
    key: 'SignOut',
    link: (
      <Link onClick={() => authService.signOut()} to='/signin'>
        Sign out
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
  console.log('User connected')

  const { anchorElUser, handleOpenUserMenu, handleCloseUserMenu } = props

  const user = useUserStore((state) => state.user)

  // build user menu
  useEffect(() => {
    menu.length = 0

    if (user) menu.push(...userMenu)
    else menu.push(...guestMenu)
  }, [user])

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
            {user
              ? (user?.firstName[0] + user?.lastName[0]).toUpperCase()
              : 'Guest'}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '60px' }}
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

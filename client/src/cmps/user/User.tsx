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
import { Link } from '@tanstack/router'
import React, { ReactNode, useEffect, useState } from 'react'

interface UserProps {
  anchorElUser: null | HTMLElement
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseUserMenu: () => void
}

const userMenu = [
  { key: 'Account', link: <Link to='/account/details'>Account</Link> },
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
  const [initials, setInitials] = useState('Guest') // State to hold the initials

  const user = useUserStore((state) => state.user)

  // build user menu
  useEffect(() => {
    // Avatar menu
    menu.length = 0

    if (user) menu.push(...userMenu)
    else menu.push(...guestMenu)

    // Avatar initials
    if (user && user.firstName.length && user.lastName.length)
      setInitials(
        user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()
      )
    else if (user) setInitials('')
    else setInitials('Guest')
  }, [user])

  return (
    <>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt='Avatar'
            src=''
            sx={{
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
              width: 60,
              height: 60,
            }}>
            {initials}
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

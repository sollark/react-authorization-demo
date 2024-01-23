import { log } from '@/service/console.service'
import useUserStore from '@/stores/userStore'
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'
import { getGuestMenu, getUserMenu } from './UserMenu'

interface UserProps {
  anchorElUser: null | HTMLElement
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseUserMenu: () => void
}

const menu: Array<{ key: string; link: ReactNode }> = []

const User = (props: UserProps) => {
  log('User connected')

  const { anchorElUser, handleOpenUserMenu, handleCloseUserMenu } = props
  const [initials, setInitials] = useState('Guest') // State to hold the initials

  const profile = useUserStore((state) => state.profile)
  const userMenu = getUserMenu()
  const guestMenu = getGuestMenu()

  // build profile menu
  useEffect(() => {
    // Avatar menu
    menu.length = 0

    if (profile) menu.push(...userMenu)
    else menu.push(...guestMenu)

    // Avatar initials
    if (profile && profile.firstName.length && profile.lastName.length)
      setInitials(
        profile.firstName[0].toUpperCase() + profile.lastName[0].toUpperCase()
      )
    else if (profile) setInitials('')
    else setInitials('Guest')
  }, [profile])

  return (
    <>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar
          alt='Avatar'
          src=''
          sx={{
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText',
            width: 45,
            height: 45,
          }}>
          {initials}
        </Avatar>
      </IconButton>

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

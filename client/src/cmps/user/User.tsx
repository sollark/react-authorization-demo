import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { yellow } from '@mui/material/colors'
import React from 'react'

interface UserProps {
  anchorElUser: null | HTMLElement
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseUserMenu: () => void
}

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const User = (props: UserProps) => {
  const { anchorElUser, handleOpenUserMenu, handleCloseUserMenu } = props
  return (
    <>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt='Moshe'
            src='/static/images/avatar/2.jpg'
            sx={{
              bgcolor: yellow[600],
              color: 'black',
              width: 56,
              height: 56,
            }}>
            Guest
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
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign='center'>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default User

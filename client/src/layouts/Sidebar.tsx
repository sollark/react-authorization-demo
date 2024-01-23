import {
  CSSObject,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  styled,
  useTheme,
} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'

import Logo from '@/cmps/logo/Logo'
import User from '@/cmps/user/User'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { useState } from 'react'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

type SidebarProps = {
  closeSidebar: () => void
  isSidebarOpen: boolean
}

const Sidebar = (props: SidebarProps) => {
  const { isSidebarOpen, closeSidebar } = props
  const theme = useTheme()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <StyledDrawer variant='permanent' open={isSidebarOpen}>
      <DrawerHeader
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Logo
          sxImg={{ display: { xs: 'none', md: 'flex' } }}
          sxText={{ display: { xs: 'none', md: 'flex' } }}
        />
        <IconButton onClick={closeSidebar}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />{' '}
      <User
        handleOpenUserMenu={handleOpenUserMenu}
        anchorElUser={anchorElUser}
        handleCloseUserMenu={handleCloseUserMenu}
      />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isSidebarOpen ? 'initial' : 'center',
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ opacity: isSidebarOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isSidebarOpen ? 'initial' : 'center',
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ opacity: isSidebarOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  )
}

export default Sidebar

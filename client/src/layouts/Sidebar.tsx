import Logo from '@/cmps/logo/Logo'
import { useNavigationMenu } from '@/hooks/useNavigationMenu'
import { Role } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
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
} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { useTranslation } from 'react-i18next'

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
  const { i18n } = useTranslation()

  // Pages
  const role: Role = useAccountStore((state) => state.role)
  const [pages] = useNavigationMenu(role)

  return (
    <StyledDrawer
      anchor={i18n.dir() === 'ltr' ? 'left' : 'right'}
      variant='permanent'
      open={isSidebarOpen}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.secondary.main
            : theme.palette.secondary.main,
        color: (theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
      }}>
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
          {i18n.dir() === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {pages.map((page, index) => (
          <ListItem key={page.key} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isSidebarOpen ? 'initial' : 'center',
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  marginInlineEnd: isSidebarOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              {isSidebarOpen && page.link}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Lumin', 'Chat', 'Schedule', 'Check in', 'Task'].map(
          (text, index) => (
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
                    marginInlineEnd: isSidebarOpen ? 3 : 'auto',
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
          )
        )}
      </List>
    </StyledDrawer>
  )
}

export default Sidebar

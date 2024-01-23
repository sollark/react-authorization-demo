import Topbar from '@/layouts/Topbar'
import { log } from '@/service/console.service'
import useAccountStore from '@/stores/accountStore'
import useAuthStore from '@/stores/authStore'
import { Box } from '@mui/material'
import { MakeLinkOptions, Outlet, useNavigate } from '@tanstack/react-router'
import { FC, useEffect, useState } from 'react'
import Sidebar from './Sidebar'

const RootPage: FC = () => {
  log('RootPage connected')

  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isComplete = useAccountStore((state) => state.isComplete)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/signin' } as unknown as MakeLinkOptions)
    } else if (!isComplete)
      navigate({ to: '/account/join' } as unknown as MakeLinkOptions)
  }, [])

  const [isOpen, setOpen] = useState(true)

  const handleSidebarOpen = () => {
    setOpen(true)
  }

  const handleSidebarClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar closeSidebar={handleSidebarClose} isSidebarOpen={isOpen} />
      <Topbar openSidebar={handleSidebarOpen} isSidebarOpen={isOpen} />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default RootPage

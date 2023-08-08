import Header from '@/cmps/Header'
import useAccountStore from '@/stores/accountStore'
import useAuthStore from '@/stores/authStore'
import { MakeLinkOptions, Outlet, useNavigate } from '@tanstack/router'
import { FC, useEffect } from 'react'

const RootPage: FC = () => {
  console.log('RootPage connected')

  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isComplete = useAccountStore((state) => state.isComplete)

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('isAuthenticated :', isAuthenticated)
      navigate({ to: '/signin' } as unknown as MakeLinkOptions)
    } else if (!isComplete)
      navigate({ to: '/account/edit' } as unknown as MakeLinkOptions)
    else if (isComplete) navigate({ to: '/' })
  }, [])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default RootPage

import Header from '@/cmps/Header'
import useAccountStore from '@/stores/accountStore'
import useUserStore from '@/stores/userStore'
import { MakeLinkOptions } from '@tanstack/router'
import { Outlet, useNavigate } from '@tanstack/router'
import { FC, useEffect } from 'react'

const RootPage: FC = () => {
  console.log('RootPage connected')

  const navigate = useNavigate()
  const { user } = useUserStore()
  const { isComplete } = useAccountStore()

  useEffect(() => {
    if (!user) navigate({ to: '/signin' } as unknown as MakeLinkOptions)
    else if (!isComplete)
      navigate({ to: '/account' } as unknown as MakeLinkOptions)
    else if (isComplete) navigate({ to: '/' })
  }, [])

  return (
    <>
      <Header />
      <Outlet /> {/* This is where child routes will render */}
    </>
  )
}

export default RootPage
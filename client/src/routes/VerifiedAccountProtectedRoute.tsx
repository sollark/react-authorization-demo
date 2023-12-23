import UnauthorizedPage from '@/pages/UnauthorizedPage'
import useAccountStore from '@/stores/accountStore'
import { ReactNode } from 'react'

type VerifiedAccountProtectedRouteProps = {
  children: ReactNode
}

const VerifiedAccountProtectedRoute = ({
  children,
}: VerifiedAccountProtectedRouteProps): JSX.Element => {
  const isAccountVerified = useAccountStore((state) => state.isVerified)()
  const isAccessAllowed = isAccountVerified

  console.log(
    'VerifiedAccountProtectedRoute, isAccessAllowed: ',
    isAccessAllowed
  )

  return <>{isAccessAllowed ? children : <UnauthorizedPage />}</>
}

export default VerifiedAccountProtectedRoute

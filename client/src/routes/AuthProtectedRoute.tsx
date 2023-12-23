import UnauthorizedPage from '@/pages/UnauthorizedPage'
import useAccountStore from '@/stores/accountStore'
import useAuthStore from '@/stores/authStore'
import { ReactNode } from 'react'

interface AuthProtectedRouteProps {
  children: ReactNode
}

const AuthProtectedRoute = ({
  children,
}: AuthProtectedRouteProps): JSX.Element => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isAccountVerified = useAccountStore((state) => state.isPending)

  const isAccessAllowed = isAuthenticated && isAccountVerified

  console.log('AuthProtectedRoute, isAccessAllowed: ', isAccessAllowed)
  return <>{isAccessAllowed ? children : <UnauthorizedPage />}</>
}

export default AuthProtectedRoute

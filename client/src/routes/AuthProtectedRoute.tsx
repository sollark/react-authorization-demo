import UnauthorizedPage from '@/pages/UnauthorizedPage'
import useAuthStore from '@/stores/authStore'
import { ReactNode } from 'react'

type AuthProtectedRouteProps = {
  children: ReactNode
}

const AuthProtectedRoute = ({
  children,
}: AuthProtectedRouteProps): JSX.Element => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isAccessAllowed = isAuthenticated

  console.log('AuthProtectedRoute, isAccessAllowed: ', isAccessAllowed)
  return <>{isAccessAllowed ? children : <UnauthorizedPage />}</>
}

export default AuthProtectedRoute

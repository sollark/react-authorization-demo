import UnauthorizedPage from '@/pages/UnauthorizedPage'
import useAuthStore from '@/stores/authStore'
import { ReactNode } from 'react'

interface AuthProtectedRouteProps {
  children: ReactNode
}

const AuthProtectedRoute = ({
  children,
}: AuthProtectedRouteProps): JSX.Element => {
  const isAuthorized = useAuthStore((state) => state.isAuthorized)
  const isAccessAllowed = isAuthorized

  console.log('AuthProtectedRoute, isAccessAllowed: ', isAccessAllowed)
  return <>{isAccessAllowed ? children : <UnauthorizedPage />}</>
}

export default AuthProtectedRoute

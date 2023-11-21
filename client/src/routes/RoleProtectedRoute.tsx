import { Role } from '@/models/Account'
import UnauthorizedPage from '@/pages/UnauthorizedPage'
import useRoleStore from '@/stores/roleStore'
import { ReactNode } from 'react'

interface RoleProtectedRouteProps {
  children: ReactNode
  allowed: Role[]
}

const RoleProtectedRoute = ({
  children,
  allowed,
}: RoleProtectedRouteProps): JSX.Element => {
  console.log('RoleProtectedRoute, allowed: ', allowed)

  const userRole = useRoleStore((state) => state.role)

  const isAccessAllowed = allowed.some(
    (allowedRole) => allowedRole === userRole
  )
  console.log('RoleProtectedRoute, isAccessAllowed: ', isAccessAllowed)
  return <>{isAccessAllowed ? children : <UnauthorizedPage />}</>
}

export default RoleProtectedRoute

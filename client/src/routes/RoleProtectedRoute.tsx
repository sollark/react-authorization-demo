import { Role } from '@/models/Role'
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

  const userRoles = useRoleStore((state) => state.roles)
  const isAccessAllowed = allowed.some((role) => userRoles?.includes(role))
  console.log('RoleProtectedRoute, isAccessAllowed: ', isAccessAllowed)
  return <>{isAccessAllowed ? children : <UnauthorizedPage />}</>
}

export default RoleProtectedRoute

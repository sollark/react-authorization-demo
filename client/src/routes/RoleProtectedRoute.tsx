import { RoleName } from '@/models/Role'
import UnauthorizedPage from '@/pages/UnauthorizedPage'
import { codeService } from '@/service/code.service'
import useRoleStore from '@/stores/roleStore'
import { ReactNode } from 'react'

interface RoleProtectedRouteProps {
  children: ReactNode
  allowed: RoleName[]
}

const RoleProtectedRoute = ({
  children,
  allowed,
}: RoleProtectedRouteProps): JSX.Element => {
  console.log('RoleProtectedRoute, allowed: ', allowed)

  const encodedRoles = useRoleStore((state) => state.roles)
  const decodedRoles = codeService.decodeRoles(encodedRoles)

  const isAccessAllowed = allowed.some((role) => decodedRoles?.includes(role))
  console.log('RoleProtectedRoute, isAccessAllowed: ', isAccessAllowed)
  return <>{isAccessAllowed ? children : <UnauthorizedPage />}</>
}

export default RoleProtectedRoute

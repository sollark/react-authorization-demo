import { Role } from '@/models/Role'
import UnauthorizedPage from '@/pages/UnauthorizedPage'
import useRoleStore from '@/stores/roleStore'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  allowed: Role[]
}

const ProtectedRoute = ({
  children,
  allowed,
}: ProtectedRouteProps): JSX.Element => {
  console.log('ProtectedRoute allowed', allowed)

  const userRoles = useRoleStore((state) => state.roles)
  const isAccessAllowed = allowed.some((role) => userRoles?.includes(role))

  return <>{isAccessAllowed ? children : <UnauthorizedPage />}</>
}

export default ProtectedRoute

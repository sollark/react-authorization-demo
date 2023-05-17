import { UserRole } from '@/config/userRoles'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  allowed: UserRole[]
}

const ProtectedRoute = ({
  children,
  allowed,
}: ProtectedRouteProps): JSX.Element => {
  console.log('ProtectedRoute allowed', allowed)
  return <>{children}</>
}

export default ProtectedRoute

import { Role } from '@/models/Role'
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
  return <>{children}</>
}

export default ProtectedRoute

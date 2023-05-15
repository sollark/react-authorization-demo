import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  console.log('ProtectedRoute')
  return <>{children}</>
}

export default ProtectedRoute

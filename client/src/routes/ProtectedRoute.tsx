import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}
const ProtectedRoute: FC<Props> = (props) => {
  const { children } = props
  return <>{children}</>
}

export default ProtectedRoute

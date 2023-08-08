import { FC } from 'react'

const UnauthorizedPage: FC = () => {
  console.log('Unauthorized connected')

  return (
    <div>
      <h1>You are not authorized</h1>
    </div>
  )
}

export default UnauthorizedPage

import { Link } from '@tanstack/router'
import { FC } from 'react'

const HomePage: FC = () => {
  console.log('Home connected')

  return (
    <div>
      <Link to='/account'>Account</Link>
      <Link to='/shift'>Shift</Link>
    </div>
  )
}

export default HomePage

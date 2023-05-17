import { Link } from '@tanstack/router'

export default function Home() {
  console.log('Home connected')
  return (
    <div>
      <h1>Hello, world!</h1>
      <Link to='/auth'>Auth</Link>
      <Link to='/shift'>Shift</Link>
    </div>
  )
}

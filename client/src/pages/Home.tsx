import { Link } from '@tanstack/router'

export default function Home() {
  console.log('Home connected')
  return (
    <div>
      <h1>Hello, world!</h1>
      <Link to='/shift'>Shift</Link>
    </div>
  )
}

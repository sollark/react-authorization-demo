import LoginForm from '../cmps/LoginForm'

export default function Home() {
  console.log('Home connected')
  return (
    <div>
      <h1>Hello, world!</h1>
      <LoginForm />
    </div>
  )
}

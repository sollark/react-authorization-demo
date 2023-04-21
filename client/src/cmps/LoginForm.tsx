import { FC, useState } from 'react'
import { authService } from '../service/auth.service'

const LoginForm: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      <button onClick={() => authService.signIn(email, password)}>
        Sign in
      </button>
      <button onClick={() => authService.registration(email, password)}>
        Registration
      </button>
      <button onClick={() => authService.signOut()}>Sign out</button>
    </div>
  )
}

export default LoginForm

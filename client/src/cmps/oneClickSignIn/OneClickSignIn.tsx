import { authService } from '@/service/auth.service'
import React from 'react'
import SecondaryButton from '../button/SecondaryButton'
import { accountService } from '@/service/account.service'
import { useNavigate } from '@tanstack/react-router'

const OneClickSignIn: React.FC = () => {
  const navigate = useNavigate()

  const handleSignIn = async (role: string) => {
    switch (role) {
      case 'employee':
        await authService.signIn('employee@test.com', 'employee@')
        break
      case 'manager':
        await authService.signIn('manager@test.com', 'manager@')
        break
      case 'supervisor':
        await authService.signIn('supervisor@test.com', 'supervisor@')
        break
      default:
        break
    }

    const account = await accountService.getAccount()
    if (account?.isComplete) navigate({ to: '/' })
    else navigate({ to: '/account/edit' })
  }

  return (
    <div style={{ display: 'flex' }}>
      <SecondaryButton onClick={() => handleSignIn('employee')}>
        Sign in as Employee
      </SecondaryButton>
      <SecondaryButton onClick={() => handleSignIn('manager')}>
        Sign in as Manager
      </SecondaryButton>
      <SecondaryButton onClick={() => handleSignIn('supervisor')}>
        Sign in as Supervisor
      </SecondaryButton>
    </div>
  )
}

export default OneClickSignIn

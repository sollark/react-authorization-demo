import { authService } from '@/service/auth.service'
import React from 'react'
import SecondaryButton from '../button/SecondaryButton'

const OneClickSignIn: React.FC = () => {
  const handleSignIn = (role: string) => {
    switch (role) {
      case 'employee':
        authService.signIn('employee@test.com', 'employeeemployee')
        break
      case 'manager':
        authService.signIn('manager@test.com', 'managermanager')
        break
      case 'supervisor':
        authService.signIn('supervisor@test.com', 'supervisorsupervisor')
        break
      default:
        break
    }
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

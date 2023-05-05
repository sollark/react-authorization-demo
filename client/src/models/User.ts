import { Workplace } from './Workplace'

export interface User {
  email: string
  isProfileComplete: boolean
  profile: {
    name: string
    lastname: string
    workplace: Workplace[]
  }
}

export interface Auth {
  isAuth: boolean
}

export interface AuthCredentials {
  email: string
  password: string
}

import { IWorkplace } from './Workplace'

export interface IUser {
  email: string
  isProfileComplete: boolean
  profile: {
    name: string
    lastname: string
    workplace: IWorkplace[]
  }
}

export interface IAuth {
  isAuth: boolean
}

export interface IAuthCredentials {
  email: string
  password: string
}

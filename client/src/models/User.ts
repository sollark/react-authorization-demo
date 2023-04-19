export interface IAuth {
  isAuth: boolean
  credentials?: IAuthCredentials
}

export interface IAuthCredentials {
  email: string
  password: string
}

export {}

declare module 'express' {
  export interface Request {
    userData?: {
      email: string
    }
  }
}

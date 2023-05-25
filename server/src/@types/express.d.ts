export {}

declare module 'express' {
  export interface Request {
    userData?: {
      id: string
    }
  }
}

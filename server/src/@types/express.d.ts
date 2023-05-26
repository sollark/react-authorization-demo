export {}

declare module 'express' {
  export interface Request {
    userData?: {
      data: string
    }
  }
}

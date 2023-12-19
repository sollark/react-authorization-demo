export type AuthResponse = {
  accessToken: string
}

export function isAuthResponse(obj: any): obj is AuthResponse {
  return obj && typeof obj === 'object' && 'accessToken' in obj
}

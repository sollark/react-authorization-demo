import useAuthStore from '@/stores/authStore'
import { AxiosRequestConfig } from 'axios'
import { log } from '../console.service'

// add custom headers here
function getHeaders(): [string, string][] {
  const headers: [string, string][] = []

  const accessToken = useAuthStore.getState().token
  if (accessToken) headers.push(['Authorization', `Bearer ${accessToken}`])

  log('headerService - getHeaders, headers', headers)
  return headers
}

// add custom headers to request
function setHeadersToRequest(request: AxiosRequestConfig) {
  const headers = getHeaders()

  headers.forEach(([headerName, value]) => {
    request.headers![headerName] = value
  })

  return request
}

export const headerService = {
  getHeaders,
  setHeadersToRequest,
}

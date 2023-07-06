import useAuthStore from '@/stores/authStore'
import { AxiosRequestConfig } from 'axios'

// add custom headers here
function getHeaders(): [string, string][] {
  const headers: [string, string][] = []

  // const accessToken = localStorage.getItem('accessToken')
  const accessToken = useAuthStore.getState().token
  if (accessToken) headers.push(['Authorization', `Bearer ${accessToken}`])

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

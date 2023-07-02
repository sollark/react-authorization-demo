import { AxiosRequestConfig } from 'axios'

function getHeaders(): [string, string][] {
  const headers: [string, string][] = []

  // add custom headers here
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) headers.push(['Authorization', `Bearer ${accessToken}`])

  return headers
}

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

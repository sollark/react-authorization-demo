function getHeaders(): [string, string][] {
  const headers: [string, string][] = []

  // add custom headers here
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) headers.push(['Authorization', `Bearer ${accessToken}`])

  return headers
}

export const headerService = {
  getHeaders,
}

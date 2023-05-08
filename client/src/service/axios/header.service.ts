const getHeaders = () => {
  const email = sessionStorage.getItem('email')
  const token = sessionStorage.getItem('token')
  const headers: [string, string][] = []

  if (email) {
    headers.push(['X-User-Email', email])
  }

  if (token) {
    headers.push(['Authorization', `Bearer ${token}`])
  }

  return headers
}

export const headerService = {
  getHeaders,
}

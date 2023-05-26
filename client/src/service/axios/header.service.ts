function getHeaders(): [string, string][] {
  const email = sessionStorage.getItem('email')
  const headers: [string, string][] = []

  if (email) {
    headers.push(['X-User-Email', email])
  }

  return headers
}

export const headerService = {
  getHeaders,
}

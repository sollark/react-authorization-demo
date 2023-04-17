import axios, { AxiosError } from 'axios'

const API_URL =
  process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

var api = axios.create({
  // to allow cookies to be sent to the server automatically
  withCredentials: true,
  baseURL: API_URL,
})

export const httpService = {
  get<T>(endpoint: string, data: T) {
    return ajax(endpoint, 'GET', data)
  },
  post<T>(endpoint: string, data: T) {
    return ajax(endpoint, 'POST', data)
  },
  put<T>(endpoint: string, data: T) {
    return ajax(endpoint, 'PUT', data)
  },
  delete<T>(endpoint: string, data: T) {
    return ajax(endpoint, 'DELETE', data)
  },
}

async function ajax<T>(
  endpoint: string,
  method = 'GET',
  data: T | null = null
) {
  try {
    const res = await api({
      url: `${API_URL}${endpoint}`,
      method,
      data,
      params: method === 'GET' ? data : null,
    })
    return res.data
  } catch (err) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `,
      data
    )
    console.dir(err)

    if ((err as AxiosError).response?.status === 401) {
      sessionStorage.clear()
      window.location.assign('/')
    }

    throw err
  }
}

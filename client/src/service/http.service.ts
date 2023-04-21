import axios, { AxiosError, AxiosPromise } from 'axios'

const API_URL =
  process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3000/api/'

var api = axios.create({
  // to allow cookies to be sent to the server automatically
  withCredentials: true,
  baseURL: API_URL,
})

//interceptor to add token to every request
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const httpService = {
  get<T, R>(endpoint: string, data: T): Promise<AxiosPromise<R>> {
    return ajax(endpoint, 'GET', data)
  },
  post<T, R>(endpoint: string, data: T): Promise<AxiosPromise<R>> {
    return ajax(endpoint, 'POST', data)
  },
  put<T, R>(endpoint: string, data: T): Promise<AxiosPromise<R>> {
    return ajax(endpoint, 'PUT', data)
  },
  delete<T, R>(endpoint: string, data: T): Promise<AxiosPromise<R>> {
    return ajax(endpoint, 'DELETE', data)
  },
}

async function ajax<T, R>(
  endpoint: string,
  method = 'GET',
  data: T | null = null
): Promise<AxiosPromise<R>> {
  try {
    const res = await api({
      url: `${API_URL}${endpoint}`,
      method,
      data,
      params: method === 'GET' ? data : null,
    })
    return res.data
  } catch (e) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `,
      data
    )
    console.dir(e)

    if ((e as AxiosError).response?.status === 401) {
      sessionStorage.clear()
      window.location.assign('/')
    }

    throw e
  }
}

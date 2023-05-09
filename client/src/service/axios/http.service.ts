import axios, {
  AxiosError,
  AxiosPromise,
  InternalAxiosRequestConfig,
} from 'axios'
import { headerService } from './header.service'

const API_URL =
  process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

var api = axios.create({
  // to allow cookies to be sent to the server automatically
  withCredentials: true,
  baseURL: API_URL,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const headers = headerService.getHeaders()
  headers.forEach(([headerName, value]) => {
    config.headers[headerName] = value
  })

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
  } catch (error) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `,
      data
    )

    if ((error as AxiosError).response?.status === 401) {
      sessionStorage.clear()
      window.location.assign('/')
    }

    throw new Error()
  }
}

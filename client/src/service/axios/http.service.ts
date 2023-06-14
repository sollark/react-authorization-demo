import { AuthResponse } from '@/models/response/AuthResponse'
import axios, {
  AxiosPromise,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { isDevelopment } from '../utils.service'
import { headerService } from './header.service'

const API_URL = isDevelopment() ? '//localhost:3030/api/' : '/api/'

var api = axios.create({
  // to allow cookies to be sent to the server automatically
  withCredentials: true,
  baseURL: API_URL,
})

// set access token in the authorization header
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const headers = headerService.getHeaders()
    headers.forEach(([headerName, value]) => {
      config.headers[headerName] = value
    })

    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

    // console.log('config', config)

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (config: AxiosResponse) => {
    return config
  },
  async (error) => {
    try {
      const originalRequest = error.config
      if (error.response.status === 401) {
        const response = await axios.get<AuthResponse>(`auth/refresh`, {
          // to allow cookies to be sent to the server automatically
          withCredentials: true,
          baseURL: API_URL,
        })
        localStorage.setItem('accessToken', response.data.accessToken)

        return api.request(originalRequest)
      }
    } catch (error) {
      return error
    }
  }
)

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
    if (isDevelopment())
      console.log(
        `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${
          data ? { ...data } : null
        }`
      )

    // if ((error as AxiosError).response?.status === 401) {
    //   sessionStorage.clear()
    //   window.location.assign('/')
    // }

    throw new Error()
  }
}

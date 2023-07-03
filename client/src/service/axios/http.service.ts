import axios, {
  AxiosError,
  AxiosPromise,
  InternalAxiosRequestConfig,
} from 'axios'
import { authService } from '../auth.service'
import { isDevelopment } from '../utils.service'
import { headerService } from './header.service'
import { stringify } from 'querystring'

const API_URL = isDevelopment() ? '//localhost:3030/api/' : '/api/'

var api = axios.create({
  // to allow cookies to be sent to the server automatically
  withCredentials: true,
  baseURL: API_URL,
})

// set headers to the request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // add your custom headers to the request here
    const headers = headerService.getHeaders()
    headers.forEach(([headerName, value]) => {
      config.headers[headerName] = value
    })

    // console.log('config', config)

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// send refresh token if access token is expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      const originalRequest: InternalAxiosRequestConfig = error?.config
      if (error?.response?.status === 401) {
        await authService.refreshTokens()

        // add your custom headers to the request here
        const headers = headerService.getHeaders()
        headers.forEach(([headerName, value]) => {
          originalRequest.headers[headerName] = value
        })

        return api.request(originalRequest)
      }
    } catch (error) {
      sessionStorage.clear()
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
  } catch (e) {
    const error = e as AxiosError

    if (isDevelopment())
      console.log(
        `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${
          data ? JSON.stringify(data) : null
        }`
      )
    if (!error?.response) throw new Error('Network Error')

    throw new Error()
  }
}

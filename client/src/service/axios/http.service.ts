import axios, { InternalAxiosRequestConfig } from 'axios'
import { authService } from '../auth.service'
import { fail, log } from '../console.service'
import { headerService } from './header.service'
import { responseService } from './response.service'

// Vite environment variables, must start with VITE_
const NODE_ENV = import.meta.env.VITE_NODE_ENV
const DEV_API_URL = import.meta.env.VITE_DEV_API_URL
const PROD_API_URL = import.meta.env.VITE_PROD_API_URL
const API_URL = isDevelopment() ? DEV_API_URL : PROD_API_URL

const api = axios.create({
  // to allow cookies to be sent to the server automatically
  withCredentials: true,
  baseURL: API_URL,
})

// set access token  to the request header
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // add your custom headers to the request here
    const headers = headerService.getHeaders()
    headers.forEach(([headerName, value]) => {
      config.headers[headerName] = value
    })

    // log('config in request', config)

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
    const originalRequest: InternalAxiosRequestConfig = error.config

    log('interceptor', error.response, originalRequest, originalRequest._retry)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (originalRequest.headers.Authorization) {
        try {
          await authService.refreshTokens()
        } catch (error) {
          return Promise.reject(error)
        }

        // Retry the original request with the updated headers
        const headers = headerService.getHeaders()
        headers.forEach(([headerName, value]) => {
          originalRequest.headers[headerName] = value
        })

        return api.request(originalRequest)
      }
    }

    return Promise.reject(error)
  }
)

export const httpService = {
  get<T, R>(endpoint: string, data: T): Promise<R | null> {
    return ajax<T, R>(endpoint, 'GET', data)
  },
  post<T, R>(endpoint: string, data: T): Promise<R | null> {
    return ajax<T, R>(endpoint, 'POST', data)
  },
  put<T, R>(endpoint: string, data: T): Promise<R | null> {
    return ajax<T, R>(endpoint, 'PUT', data)
  },
  delete<T, R>(endpoint: string, data: T): Promise<R | null> {
    return ajax<T, R>(endpoint, 'DELETE', data)
  },
}

async function ajax<T, R>(
  endpoint: string,
  method = 'GET',
  data: T | null = null
): Promise<R | null> {
  try {
    const res = await api({
      url: `${API_URL}${endpoint}`,
      method,
      data,
      params: data,
    })

    // return res.data
    return responseService.handleApiResponse<R>(res)
  } catch (error) {
    if (isDevelopment())
      fail(
        `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${
          data ? JSON.stringify(data) : null
        }, error: ${error}`
      )

    throw error
  }
}

function isDevelopment(): boolean {
  return NODE_ENV === 'development'
}

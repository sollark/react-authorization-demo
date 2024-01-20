import { config } from '@/config/config'
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { authService } from '../auth.service'
import { fail } from '../console.service'
import { headerService } from './header.service'

export type ApiSuccessResponse<T> = {
  success: true
  message: string
  data: T
}

export type ApiErrorResponse = {
  success: false
  message: string
}

const API_URL = config.apiUrl
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

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// send refresh token if access token is expired
let isRetry = false
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: InternalAxiosRequestConfig = error.config

    console.log('get error in response')
    if (error.response?.status === 401 && !isRetry) {
      isRetry = true

      console.log('the error is 401 first time')
      if (originalRequest.headers.Authorization) {
        console.log('send refresh')
        await authService.refreshTokens()

        // Retry the original request with the updated headers
        const headers = headerService.getHeaders()
        headers.forEach(([headerName, value]) => {
          originalRequest.headers[headerName] = value
        })

        return api.request(originalRequest)
      }
    }

    if (error.response.data.errors[0].message == 'Refresh token is expired') {
      isRetry = false

      window.location.href = '/signin'

      return
    }

    isRetry = false
    return Promise.reject(error)
  }
)

export const httpService = {
  get<T, P, R>(
    endpoint: string,
    data: null,
    params?: P
  ): Promise<ApiSuccessResponse<R> | ApiErrorResponse | null> {
    return ajax<T, P, R>(endpoint, 'GET', data, params)
  },
  post<T, P, R>(
    endpoint: string,
    data: T
  ): Promise<ApiSuccessResponse<R> | ApiErrorResponse | null> {
    return ajax<T, P, R>(endpoint, 'POST', data)
  },
  put<T, P, R>(
    endpoint: string,
    data: T,
    params?: P
  ): Promise<ApiSuccessResponse<R> | ApiErrorResponse | null> {
    return ajax<T, P, R>(endpoint, 'PUT', data, params)
  },
  delete<T, P, R>(
    endpoint: string,
    data: T,
    params?: P
  ): Promise<ApiSuccessResponse<R> | ApiErrorResponse | null> {
    return ajax<T, P, R>(endpoint, 'DELETE', data, params)
  },
}

async function ajax<T, P, R>(
  endpoint: string,
  method: string,
  data: T | null = null,
  params?: P
): Promise<ApiSuccessResponse<R> | ApiErrorResponse | null> {
  try {
    const config: AxiosRequestConfig = {
      method,
      url: endpoint,
    }

    if (method === 'GET' || method === 'DELETE') {
      config.params = params
    } else {
      config.data = data
    }

    const response = await api(config)

    return response.data as ApiSuccessResponse<R> | ApiErrorResponse
  } catch (error) {
    fail(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${
        data ? JSON.stringify(data) : null
      }, error: ${error}`
    )

    return null
  }
}

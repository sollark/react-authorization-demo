import { config } from '@/config/config'
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { authService } from '../auth.service'
import { fail, log } from '../console.service'
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
    log('interceptor: adding header')

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
      log('interceptor, originalRequest', originalRequest._retry)
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
  get<T, R>(
    endpoint: string,
    data: T
  ): Promise<ApiSuccessResponse<R> | ApiErrorResponse | null> {
    return ajax<T, R>(endpoint, 'GET', data)
  },
  post<T, R>(
    endpoint: string,
    data: T
  ): Promise<ApiSuccessResponse<R> | ApiErrorResponse | null> {
    return ajax<T, R>(endpoint, 'POST', data)
  },
  put<T, R>(
    endpoint: string,
    data: T
  ): Promise<ApiSuccessResponse<R> | ApiErrorResponse | null> {
    return ajax<T, R>(endpoint, 'PUT', data)
  },
  delete<T, R>(
    endpoint: string,
    data: T
  ): Promise<ApiSuccessResponse<R> | ApiErrorResponse | null> {
    return ajax<T, R>(endpoint, 'DELETE', data)
  },
}

async function ajax<T, R>(
  endpoint: string,
  method = 'GET',
  data: T | null = null
): Promise<ApiSuccessResponse<R> | ApiErrorResponse | null> {
  try {
    const response: AxiosResponse<R> = await api({
      url: `${endpoint}`,
      method,
      data,
      params: data,
    })

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

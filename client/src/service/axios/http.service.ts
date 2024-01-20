import { fail } from '../console.service'
import { api } from './api'
import { configureInterceptors } from './interceptors'

export type ApiSuccessResponse<D> = {
  success: true
  message: string
  data: D
}

export type ApiErrorResponse = {
  success: false
  message: string
}

type ApiResponse<T> = {
  type: ApiResponseType
  data?: T
  error?: string
}

type RequestConfig<TRequest, TParams> = {
  method: HttpMethod
  url: string
  params?: TParams
  data?: object
}

enum ApiResponseType {
  Success,
  Error,
}

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

// Interceptors
configureInterceptors(api)

async function sendRequest<TResponse, TRequest, TParams>(
  config: RequestConfig<TRequest, TParams>
): Promise<ApiResponse<TResponse>> {
  // Add request validation
  if (!Object.values(HttpMethod).includes(config.method)) {
    throw Error('Invalid method')
  }

  // Make request
  try {
    const response = await api({
      method: config.method,
      url: config.url,
      data: config.data as TRequest,
      params: config.params,
    })

    return {
      type: ApiResponseType.Success,
      data: response.data as TResponse,
    }
  } catch (error: any) {
    fail(
      `Had Issues ${config.method}ing to the backend, endpoint: ${
        config.url
      }, with data: ${
        config.data ? JSON.stringify(config.data) : null
      }, error: ${error}`
    )

    return {
      type: ApiResponseType.Error,
      error: error.message,
    }
  }
}

export const httpService = {
  get<TResponse, TParams extends object>(
    endpoint: string,
    params?: TParams
  ): Promise<ApiResponse<TResponse>> {
    return sendRequest({
      method: HttpMethod.GET,
      url: `${endpoint}`,
      params,
    })
  },
  post<TResponse, TParams extends object>(
    endpoint: string,
    params?: TParams
  ): Promise<ApiResponse<TResponse>> {
    return sendRequest({
      method: HttpMethod.GET,
      url: `${endpoint}`,
      params,
    })
  },

  put<TResponse, TParams extends object>(
    endpoint: string,
    params?: TParams
  ): Promise<ApiResponse<TResponse>> {
    return sendRequest({
      method: HttpMethod.GET,
      url: `${endpoint}`,
      params,
    })
  },
  delete<TResponse, TParams extends object>(
    endpoint: string,
    params?: TParams
  ): Promise<ApiResponse<TResponse>> {
    return sendRequest({
      method: HttpMethod.GET,
      url: `${endpoint}`,
      params,
    })
  },
}

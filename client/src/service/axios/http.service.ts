import { fail } from '../console.service'
import { api } from './api'
import { configureInterceptors } from './interceptors'

export type FailedResponse = {
  success: false
  message: string
}

export type SuccessfulResponse<D> = {
  success: true
  message: string
  data: D
}

type RequestConfig = {
  method: HttpMethod
  url: string
  params?: object
  data?: object
}

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

// Interceptors
configureInterceptors(api)

async function sendRequest<D>(
  config: RequestConfig
): Promise<FailedResponse | SuccessfulResponse<D>> {
  // Request validation
  if (!Object.values(HttpMethod).includes(config.method)) {
    throw new Error('Invalid HTTP method')
  }

  try {
    const response = await api({
      method: config.method,
      url: config.url,
      params: config.params,
      data: config.data,
    })

    return response.data
  } catch (error: any) {
    fail(`Error with ${config.method} request to ${config.url}: ${error}`)

    return {
      success: false,
      message: error.message,
    }
  }
}

export const httpService = {
  get<D>(
    endpoint: string,
    params?: object
  ): Promise<FailedResponse | SuccessfulResponse<D>> {
    return sendRequest({
      method: HttpMethod.GET,
      url: endpoint,
      params,
    })
  },

  post<D>(
    endpoint: string,
    data?: object,
    params?: object
  ): Promise<FailedResponse | SuccessfulResponse<D>> {
    return sendRequest({
      method: HttpMethod.POST,
      url: endpoint,
      data,
      params,
    })
  },

  put<D>(
    endpoint: string,
    params?: object
  ): Promise<FailedResponse | SuccessfulResponse<D>> {
    return sendRequest({
      method: HttpMethod.PUT,
      url: endpoint,
      params,
    })
  },

  delete<D>(
    endpoint: string,
    params?: object
  ): Promise<FailedResponse | SuccessfulResponse<D>> {
    return sendRequest({
      method: HttpMethod.DELETE,
      url: endpoint,
      params,
    })
  },
}

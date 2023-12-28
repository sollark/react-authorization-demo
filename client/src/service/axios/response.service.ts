import { ApiResponse } from '@/models/response/ApiResponse'
import { AxiosResponse } from 'axios'
import { log } from '../console.service'

async function handleApiResponse<T>(
  response: AxiosResponse<ApiResponse<T>>
): Promise<T | null> {
  const { success, message, data } = response.data
  if (!success) {
    log(message)
    return null
  }

  return data
}

export const responseService = {
  handleApiResponse,
}

import { httpClient } from '@/api/httpClient'
import type { ApiResponse, User } from '@/types/user'
import type { ProfilePayload } from './schemas'

export async function updateProfile(payload: ProfilePayload): Promise<User> {
  const response = await httpClient.patch<ApiResponse<User>>('/user/profile', payload)
  return response.data
}

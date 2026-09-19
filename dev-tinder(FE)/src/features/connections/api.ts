import { httpClient } from '@/api/httpClient'
import type { ConnectionRequest } from '@/types/connectionRequest'
import type { ApiResponse } from '@/types/user'

export async function fetchConnections(): Promise<ConnectionRequest[]> {
  const response = await httpClient.get<ApiResponse<ConnectionRequest[]>>('/user/connections')
  return response.data
}

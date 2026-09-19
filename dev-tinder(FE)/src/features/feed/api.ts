import { httpClient } from '@/api/httpClient'
import type { SendRequestStatus } from '@/types/connectionRequest'
import type { ApiResponse, User } from '@/types/user'

export async function fetchFeed(): Promise<User[]> {
  const response = await httpClient.get<ApiResponse<User[]>>('/user/feed')
  return response.data
}

export interface SendRequestInput {
  toUserId: string
  status: SendRequestStatus
}

/** Returns the backend's message, e.g. "Asha is interested in Ravi profile". */
export async function sendConnectionRequest({
  toUserId,
  status,
}: SendRequestInput): Promise<string> {
  const response = await httpClient.post<ApiResponse<unknown>>(
    `/request/send/${status}/${toUserId}`,
  )
  return response.message
}

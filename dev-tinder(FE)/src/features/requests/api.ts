import { httpClient } from '@/api/httpClient'
import type { IncomingRequest, ReviewRequestStatus } from '@/types/connectionRequest'
import type { ApiResponse } from '@/types/user'

export async function fetchIncomingRequests(): Promise<IncomingRequest[]> {
  const response = await httpClient.get<ApiResponse<IncomingRequest[]>>('/user/getAllRequests')
  return response.data
}

export interface ReviewRequestInput {
  requestId: string
  status: ReviewRequestStatus
}

export async function reviewConnectionRequest({
  requestId,
  status,
}: ReviewRequestInput): Promise<string> {
  const response = await httpClient.post<{ message: string }>(
    `/request/review/${status}/${requestId}`,
  )
  return response.message
}

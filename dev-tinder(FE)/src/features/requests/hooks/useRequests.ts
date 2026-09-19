import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys'
import { fetchIncomingRequests } from '../api'

export function useRequests() {
  return useQuery({
    queryKey: queryKeys.requests,
    queryFn: fetchIncomingRequests,
  })
}

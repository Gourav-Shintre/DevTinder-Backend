import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys'
import { fetchConnections } from '../api'

export function useConnections() {
  return useQuery({
    queryKey: queryKeys.connections,
    queryFn: fetchConnections,
  })
}

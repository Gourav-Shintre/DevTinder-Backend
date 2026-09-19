import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys'
import { fetchFeed } from '../api'

export function useFeed() {
  return useQuery({
    queryKey: queryKeys.feed,
    queryFn: fetchFeed,
  })
}

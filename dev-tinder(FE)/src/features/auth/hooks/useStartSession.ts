import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { queryKeys } from '@/api/queryKeys'
import { useAuthStore } from '@/store/authStore'
import type { User } from '@/types/user'

/**
 * Shared "a user just logged in" step, used by both login and signup:
 * drop any cached data from a previous user, store the new user, go to the feed.
 */
export function useStartSession() {
  const queryClient = useQueryClient()
  const setUser = useAuthStore((state) => state.setUser)
  const navigate = useNavigate()

  return (user: User) => {
    // keep the currentUser query (the root layout observes it) and overwrite its data
    queryClient.removeQueries({
      predicate: (query) => query.queryKey[0] !== queryKeys.currentUser[0],
    })
    queryClient.setQueryData(queryKeys.currentUser, user)
    setUser(user)
    navigate('/', { replace: true })
  }
}

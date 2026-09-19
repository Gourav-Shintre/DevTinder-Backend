import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { queryKeys } from '@/api/queryKeys'
import { useAuthStore } from '@/store/authStore'
import { fetchCurrentUser } from '../api'

/**
 * Checks the session on app start (is the auth cookie still valid?)
 * and mirrors the result into the auth store.
 * Mounted once, in the root layout.
 */
export function useCurrentUser() {
  const setUser = useAuthStore((state) => state.setUser)
  const clearUser = useAuthStore((state) => state.clearUser)

  const query = useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: fetchCurrentUser,
    retry: false, // a 401 here just means "not logged in"
    staleTime: Infinity,
  })

  useEffect(() => {
    if (query.data) setUser(query.data)
    else if (query.isError) clearUser()
  }, [query.data, query.isError, setUser, clearUser])

  return query
}

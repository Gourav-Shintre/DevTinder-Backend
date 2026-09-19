import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/api/ApiError'
import { useAuthStore } from '@/store/authStore'

/**
 * If any request comes back 401 (cookie missing or expired), the session is over:
 * clear the user, and the route guards redirect to /login.
 */
function handleUnauthorized(error: unknown) {
  if (error instanceof ApiError && error.isUnauthorized) {
    useAuthStore.getState().clearUser()
  }
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleUnauthorized }),
  mutationCache: new MutationCache({ onError: handleUnauthorized }),
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      // don't retry errors the server answered on purpose (4xx), only network/5xx
      retry: (failureCount, error) =>
        error instanceof ApiError && error.status >= 400 && error.status < 500
          ? false
          : failureCount < 2,
    },
  },
})

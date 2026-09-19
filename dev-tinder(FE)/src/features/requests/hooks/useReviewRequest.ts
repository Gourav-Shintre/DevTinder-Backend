import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getErrorMessage } from '@/api/ApiError'
import { queryKeys } from '@/api/queryKeys'
import { useToastStore } from '@/store/toastStore'
import { reviewConnectionRequest } from '../api'

/** Accept / Reject an incoming request. Accepting creates a connection. */
export function useReviewRequest() {
  const queryClient = useQueryClient()
  const showToast = useToastStore((state) => state.showToast)

  return useMutation({
    mutationFn: reviewConnectionRequest,
    onSuccess: (message) => {
      showToast(message)
      queryClient.invalidateQueries({ queryKey: queryKeys.requests })
      queryClient.invalidateQueries({ queryKey: queryKeys.connections })
    },
    onError: (error) => showToast(getErrorMessage(error), 'error'),
  })
}

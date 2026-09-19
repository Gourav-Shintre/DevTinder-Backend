import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getErrorMessage } from '@/api/ApiError'
import { queryKeys } from '@/api/queryKeys'
import { useToastStore } from '@/store/toastStore'
import type { User } from '@/types/user'
import { sendConnectionRequest, type SendRequestInput } from '../api'

/**
 * Interested / Ignore on a feed card.
 * Optimistic: the card disappears immediately, and comes back if the request fails.
 */
export function useSendRequest() {
  const queryClient = useQueryClient()
  const showToast = useToastStore((state) => state.showToast)

  return useMutation({
    mutationFn: sendConnectionRequest,

    onMutate: async ({ toUserId }: SendRequestInput) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.feed })
      const previousFeed = queryClient.getQueryData<User[]>(queryKeys.feed)

      queryClient.setQueryData<User[]>(queryKeys.feed, (feed = []) =>
        feed.filter((user) => user._id !== toUserId),
      )

      return { previousFeed }
    },

    onError: (error, _input, context) => {
      queryClient.setQueryData(queryKeys.feed, context?.previousFeed)
      showToast(getErrorMessage(error), 'error')
    },

    onSuccess: (message, { status }) => {
      if (status === 'interested') showToast(message)
    },
  })
}

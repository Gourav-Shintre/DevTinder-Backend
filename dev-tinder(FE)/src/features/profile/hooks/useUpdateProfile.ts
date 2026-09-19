import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys'
import { useAuthStore } from '@/store/authStore'
import { useToastStore } from '@/store/toastStore'
import { updateProfile } from '../api'

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  const setUser = useAuthStore((state) => state.setUser)
  const showToast = useToastStore((state) => state.showToast)

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.currentUser, updatedUser)
      setUser(updatedUser)
      showToast('Profile updated')
    },
  })
}

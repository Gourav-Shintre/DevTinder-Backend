import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { useAuthStore } from '@/store/authStore'
import { logout } from '../api'

export function useLogout() {
  const queryClient = useQueryClient()
  const clearUser = useAuthStore((state) => state.clearUser)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logout,
    // Log out locally even if the request fails, so the user is never stuck logged in
    onSettled: () => {
      queryClient.clear()
      clearUser()
      navigate('/login', { replace: true })
    },
  })
}

import { useMutation } from '@tanstack/react-query'
import { login } from '../api'
import { useStartSession } from './useStartSession'

export function useLogin() {
  const startSession = useStartSession()

  return useMutation({
    mutationFn: login,
    onSuccess: startSession,
  })
}

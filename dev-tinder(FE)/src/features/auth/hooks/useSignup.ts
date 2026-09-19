import { useMutation } from '@tanstack/react-query'
import { useToastStore } from '@/store/toastStore'
import { login, signup } from '../api'
import type { SignupFormValues } from '../schemas'
import { useStartSession } from './useStartSession'

/**
 * The backend's signup does not set the auth cookie,
 * so after creating the account we log in with the same credentials.
 */
export function useSignup() {
  const startSession = useStartSession()
  const showToast = useToastStore((state) => state.showToast)

  return useMutation({
    mutationFn: async (values: SignupFormValues) => {
      await signup(values)
      return login({ emailId: values.emailId, password: values.password })
    },
    onSuccess: (user) => {
      showToast(`Welcome to DevTinder, ${user.firstName}!`)
      startSession(user)
    },
  })
}

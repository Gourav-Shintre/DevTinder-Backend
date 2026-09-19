import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { User } from '@/types/user'

/**
 * Session state: who is logged in.
 * `status` lets route guards wait until the session check (GET /user/) finishes
 * instead of flashing the login page on refresh.
 */
type AuthStatus = 'checking' | 'authenticated' | 'guest'

interface AuthState {
  user: User | null
  status: AuthStatus
  setUser: (user: User) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      status: 'checking',
      setUser: (user) => set({ user, status: 'authenticated' }, false, 'auth/setUser'),
      clearUser: () => set({ user: null, status: 'guest' }, false, 'auth/clearUser'),
    }),
    { name: 'authStore' },
  ),
)

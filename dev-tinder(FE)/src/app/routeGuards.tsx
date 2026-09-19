import { Navigate, Outlet } from 'react-router'
import { PageSpinner } from '@/components/ui/Spinner'
import { useAuthStore } from '@/store/authStore'

/** Only for logged-in users; everyone else goes to /login. */
export function ProtectedRoute() {
  const status = useAuthStore((state) => state.status)

  if (status === 'checking') return <PageSpinner />
  if (status === 'guest') return <Navigate to="/login" replace />
  return <Outlet />
}

/** Only for logged-out users (login / signup); logged-in users go to the feed. */
export function GuestRoute() {
  const status = useAuthStore((state) => state.status)

  if (status === 'checking') return <PageSpinner />
  if (status === 'authenticated') return <Navigate to="/" replace />
  return <Outlet />
}

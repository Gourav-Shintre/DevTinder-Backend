import { Outlet } from 'react-router'
import { Toaster } from '@/components/layout/Toaster'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'

/** Top of the route tree: checks the session once and renders global UI. */
export function RootLayout() {
  useCurrentUser()

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  )
}

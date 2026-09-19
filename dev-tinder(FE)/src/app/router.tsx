import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/components/layout/AppLayout'
import { ConnectionsPage } from '@/pages/ConnectionsPage'
import { FeedPage } from '@/pages/FeedPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { RequestsPage } from '@/pages/RequestsPage'
import { SignupPage } from '@/pages/SignupPage'
import { RootLayout } from './RootLayout'
import { GuestRoute, ProtectedRoute } from './routeGuards'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <GuestRoute />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/signup', element: <SignupPage /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: '/', element: <FeedPage /> },
              { path: '/requests', element: <RequestsPage /> },
              { path: '/connections', element: <ConnectionsPage /> },
              { path: '/profile', element: <ProfilePage /> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

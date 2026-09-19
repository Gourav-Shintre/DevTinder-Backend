import { Link } from 'react-router'
import { PageHeader } from '@/components/layout/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { PageSpinner } from '@/components/ui/Spinner'
import { ConnectionItem } from '@/features/connections/components/ConnectionItem'
import { useConnections } from '@/features/connections/hooks/useConnections'
import { getOtherUser } from '@/lib/getOtherUser'
import { useAuthStore } from '@/store/authStore'

export function ConnectionsPage() {
  const connectionsQuery = useConnections()
  const currentUser = useAuthStore((state) => state.user)

  if (connectionsQuery.isPending || !currentUser) return <PageSpinner />
  if (connectionsQuery.isError) {
    return (
      <ErrorMessage error={connectionsQuery.error} onRetry={() => connectionsQuery.refetch()} />
    )
  }

  const connections = connectionsQuery.data

  return (
    <div>
      <PageHeader title="Connections" description="Developers you've matched with" />

      {connections.length === 0 ? (
        <EmptyState
          title="No connections yet"
          description="Show interest in developers on the feed to start connecting."
          action={
            <Link to="/" className="text-sm font-medium text-rose-600 hover:underline">
              Go to feed
            </Link>
          }
        />
      ) : (
        <ul className="space-y-3">
          {connections.map((connection) => (
            <li key={connection._id}>
              <ConnectionItem user={getOtherUser(connection, currentUser._id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

import { PageHeader } from '@/components/layout/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { PageSpinner } from '@/components/ui/Spinner'
import { UserCard } from '@/features/feed/components/UserCard'
import { useFeed } from '@/features/feed/hooks/useFeed'
import { useSendRequest } from '@/features/feed/hooks/useSendRequest'

export function FeedPage() {
  const feedQuery = useFeed()
  const sendRequestMutation = useSendRequest()

  if (feedQuery.isPending) return <PageSpinner />
  if (feedQuery.isError) {
    return <ErrorMessage error={feedQuery.error} onRetry={() => feedQuery.refetch()} />
  }

  // Show one profile at a time, like a swipe deck
  const [currentUser] = feedQuery.data

  return (
    <div className="mx-auto max-w-sm">
      <PageHeader title="Discover" description={`${feedQuery.data.length} developers to explore`} />

      {currentUser ? (
        <UserCard
          key={currentUser._id}
          user={currentUser}
          isDisabled={sendRequestMutation.isPending}
          onIgnore={() =>
            sendRequestMutation.mutate({ toUserId: currentUser._id, status: 'ignored' })
          }
          onInterested={() =>
            sendRequestMutation.mutate({ toUserId: currentUser._id, status: 'interested' })
          }
        />
      ) : (
        <EmptyState
          title="You're all caught up"
          description="No new developers right now. Check back later!"
        />
      )}
    </div>
  )
}

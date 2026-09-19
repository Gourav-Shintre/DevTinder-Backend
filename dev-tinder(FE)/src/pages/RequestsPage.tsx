import { PageHeader } from '@/components/layout/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { PageSpinner } from '@/components/ui/Spinner'
import { RequestItem } from '@/features/requests/components/RequestItem'
import { useRequests } from '@/features/requests/hooks/useRequests'
import { useReviewRequest } from '@/features/requests/hooks/useReviewRequest'

export function RequestsPage() {
  const requestsQuery = useRequests()
  const reviewRequestMutation = useReviewRequest()

  if (requestsQuery.isPending) return <PageSpinner />
  if (requestsQuery.isError) {
    return <ErrorMessage error={requestsQuery.error} onRetry={() => requestsQuery.refetch()} />
  }

  const requests = requestsQuery.data

  return (
    <div>
      <PageHeader title="Requests" description="Developers who are interested in you" />

      {requests.length === 0 ? (
        <EmptyState title="No pending requests" description="New requests will show up here." />
      ) : (
        <ul className="space-y-3">
          {requests.map((request) => (
            <li key={request._id}>
              <RequestItem
                request={request}
                isDisabled={reviewRequestMutation.isPending}
                onAccept={() =>
                  reviewRequestMutation.mutate({ requestId: request._id, status: 'accepted' })
                }
                onReject={() =>
                  reviewRequestMutation.mutate({ requestId: request._id, status: 'rejected' })
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

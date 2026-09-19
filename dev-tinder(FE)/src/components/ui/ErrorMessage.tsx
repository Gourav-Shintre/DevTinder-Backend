import { getErrorMessage } from '@/api/ApiError'
import { Button } from './Button'

interface ErrorMessageProps {
  error: unknown
  onRetry?: () => void
}

/** Shows an error from a query or mutation, with an optional retry button. */
export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  if (!error) return null

  return (
    <div
      role="alert"
      className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      <span>{getErrorMessage(error)}</span>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  )
}

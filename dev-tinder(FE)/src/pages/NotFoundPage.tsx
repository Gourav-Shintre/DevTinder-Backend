import { Link } from 'react-router'
import { EmptyState } from '@/components/ui/EmptyState'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <EmptyState
        title="Page not found"
        description="The page you are looking for does not exist."
        action={
          <Link to="/" className="text-sm font-medium text-rose-600 hover:underline">
            Back to feed
          </Link>
        }
      />
    </div>
  )
}

import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { getFullName } from '@/lib/getFullName'
import type { IncomingRequest } from '@/types/connectionRequest'

interface RequestItemProps {
  request: IncomingRequest
  onAccept: () => void
  onReject: () => void
  isDisabled?: boolean
}

export function RequestItem({ request, onAccept, onReject, isDisabled = false }: RequestItemProps) {
  const sender = request.fromUserId
  const fullName = getFullName(sender)

  return (
    <Card className="flex items-center gap-4 p-4">
      <Avatar src={sender.photoUrl} name={fullName} />

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-900">{fullName}</p>
        <p className="text-sm text-slate-500">is interested in you</p>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" onClick={onReject} disabled={isDisabled}>
          Reject
        </Button>
        <Button onClick={onAccept} disabled={isDisabled}>
          Accept
        </Button>
      </div>
    </Card>
  )
}

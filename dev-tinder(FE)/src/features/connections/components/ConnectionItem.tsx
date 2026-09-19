import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/ui/Card'
import { getFullName } from '@/lib/getFullName'
import type { User } from '@/types/user'

interface ConnectionItemProps {
  user: User
}

export function ConnectionItem({ user }: ConnectionItemProps) {
  const fullName = getFullName(user)
  const details = [user.age && `${user.age}`, user.gender].filter(Boolean).join(' · ')

  return (
    <Card className="flex items-center gap-4 p-4">
      <Avatar src={user.photoUrl} name={fullName} />

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-900">{fullName}</p>
        {details && <p className="text-sm capitalize text-slate-500">{details}</p>}
        {user.skills && user.skills.length > 0 && (
          <p className="truncate text-xs text-slate-500">{user.skills.join(', ')}</p>
        )}
      </div>
    </Card>
  )
}

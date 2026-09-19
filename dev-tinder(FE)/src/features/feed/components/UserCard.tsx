import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { getFullName } from '@/lib/getFullName'
import type { User } from '@/types/user'

interface UserCardProps {
  user: User
  onIgnore: () => void
  onInterested: () => void
  isDisabled?: boolean
}

export function UserCard({ user, onIgnore, onInterested, isDisabled = false }: UserCardProps) {
  const fullName = getFullName(user)
  const details = [user.age && `${user.age}`, user.gender].filter(Boolean).join(' · ')

  return (
    <Card className="overflow-hidden p-0">
      <div className="aspect-square w-full bg-rose-50">
        <Avatar src={user.photoUrl} name={fullName} size="lg" className="rounded-none" />
      </div>

      <div className="space-y-3 p-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{fullName}</h2>
          {details && <p className="text-sm capitalize text-slate-500">{details}</p>}
        </div>

        {user.skills && user.skills.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
              >
                {skill}
              </li>
            ))}
          </ul>
        )}

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button variant="secondary" onClick={onIgnore} disabled={isDisabled}>
            Ignore
          </Button>
          <Button onClick={onInterested} disabled={isDisabled}>
            Interested
          </Button>
        </div>
      </div>
    </Card>
  )
}

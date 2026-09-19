import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { PageSpinner } from '@/components/ui/Spinner'
import { ProfileForm } from '@/features/profile/components/ProfileForm'
import { useAuthStore } from '@/store/authStore'

export function ProfilePage() {
  const user = useAuthStore((state) => state.user)

  if (!user) return <PageSpinner />

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Your profile" description={user.emailId} />
      <Card>
        <ProfileForm user={user} />
      </Card>
    </div>
  )
}

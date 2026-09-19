import { Link, NavLink } from 'react-router'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { cn } from '@/lib/cn'
import { getFullName } from '@/lib/getFullName'
import { useAuthStore } from '@/store/authStore'

const NAV_LINKS = [
  { to: '/', label: 'Feed' },
  { to: '/requests', label: 'Requests' },
  { to: '/connections', label: 'Connections' },
]

export function Navbar() {
  const user = useAuthStore((state) => state.user)
  const logoutMutation = useLogout()

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-lg font-bold text-rose-500">
          DevTinder
        </Link>

        <ul className="flex gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm font-medium',
                    isActive ? 'bg-rose-50 text-rose-600' : 'text-slate-600 hover:bg-slate-100',
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {user && (
            <Link to="/profile" title="Edit profile">
              <Avatar src={user.photoUrl} name={getFullName(user)} size="sm" />
            </Link>
          )}
          <Button
            variant="ghost"
            onClick={() => logoutMutation.mutate()}
            isLoading={logoutMutation.isPending}
          >
            Logout
          </Button>
        </div>
      </nav>
    </header>
  )
}

import type { ReactNode } from 'react'
import { Card } from '@/components/ui/Card'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

/** Centered card used by the login and signup pages. */
export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-rose-50 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-rose-500">DevTinder</p>
          <h1 className="mt-4 text-xl font-semibold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <Card>{children}</Card>
        <p className="text-center text-sm text-slate-600">{footer}</p>
      </div>
    </div>
  )
}

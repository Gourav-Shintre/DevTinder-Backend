import { Link } from 'react-router'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { LoginForm } from '@/features/auth/components/LoginForm'

export function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to find developers to connect with"
      footer={
        <>
          New here?{' '}
          <Link to="/signup" className="font-medium text-rose-600 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  )
}

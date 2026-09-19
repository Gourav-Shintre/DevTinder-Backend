import { Link } from 'react-router'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { SignupForm } from '@/features/auth/components/SignupForm'

export function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Meet developers who share your stack"
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-rose-600 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthLayout>
  )
}

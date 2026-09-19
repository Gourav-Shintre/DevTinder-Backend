import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { useSignup } from '../hooks/useSignup'
import { signupSchema, type SignupFormValues } from '../schemas'

export function SignupForm() {
  const signupMutation = useSignup()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: '', lastName: '', emailId: '', password: '' },
  })

  const onSubmit = (values: SignupFormValues) => signupMutation.mutate(values)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="First name" htmlFor="firstName" error={errors.firstName?.message}>
          <Input
            id="firstName"
            autoComplete="given-name"
            hasError={!!errors.firstName}
            {...register('firstName')}
          />
        </FormField>

        <FormField label="Last name" htmlFor="lastName" error={errors.lastName?.message}>
          <Input
            id="lastName"
            autoComplete="family-name"
            hasError={!!errors.lastName}
            {...register('lastName')}
          />
        </FormField>
      </div>

      <FormField label="Email" htmlFor="emailId" error={errors.emailId?.message}>
        <Input
          id="emailId"
          type="email"
          autoComplete="email"
          hasError={!!errors.emailId}
          {...register('emailId')}
        />
      </FormField>

      <FormField
        label="Password"
        htmlFor="password"
        error={errors.password?.message}
        hint="At least 8 characters"
      >
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          hasError={!!errors.password}
          {...register('password')}
        />
      </FormField>

      <ErrorMessage error={signupMutation.error} />

      <Button type="submit" className="w-full" isLoading={signupMutation.isPending}>
        Create account
      </Button>
    </form>
  )
}

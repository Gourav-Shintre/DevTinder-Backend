import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { useLogin } from '../hooks/useLogin'
import { loginSchema, type LoginFormValues } from '../schemas'

export function LoginForm() {
  const loginMutation = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { emailId: '', password: '' },
  })

  const onSubmit = (values: LoginFormValues) => loginMutation.mutate(values)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FormField label="Email" htmlFor="emailId" error={errors.emailId?.message}>
        <Input
          id="emailId"
          type="email"
          autoComplete="email"
          hasError={!!errors.emailId}
          {...register('emailId')}
        />
      </FormField>

      <FormField label="Password" htmlFor="password" error={errors.password?.message}>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          hasError={!!errors.password}
          {...register('password')}
        />
      </FormField>

      <ErrorMessage error={loginMutation.error} />

      <Button type="submit" className="w-full" isLoading={loginMutation.isPending}>
        Log in
      </Button>
    </form>
  )
}

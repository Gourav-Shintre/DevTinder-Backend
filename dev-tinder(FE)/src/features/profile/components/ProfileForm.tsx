import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import type { User } from '@/types/user'
import { useUpdateProfile } from '../hooks/useUpdateProfile'
import {
  GENDER_OPTIONS,
  profileSchema,
  toProfileFormValues,
  toProfilePayload,
  type ProfileFormValues,
} from '../schemas'

interface ProfileFormProps {
  user: User
}

export function ProfileForm({ user }: ProfileFormProps) {
  const updateProfileMutation = useUpdateProfile()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: toProfileFormValues(user),
  })

  const onSubmit = (values: ProfileFormValues) =>
    updateProfileMutation.mutate(toProfilePayload(values), {
      // make the saved values the new "clean" state of the form
      onSuccess: (updatedUser) => reset(toProfileFormValues(updatedUser)),
    })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="First name" htmlFor="firstName" error={errors.firstName?.message}>
          <Input id="firstName" hasError={!!errors.firstName} {...register('firstName')} />
        </FormField>

        <FormField label="Last name" htmlFor="lastName" error={errors.lastName?.message}>
          <Input id="lastName" hasError={!!errors.lastName} {...register('lastName')} />
        </FormField>

        <FormField label="Age" htmlFor="age" error={errors.age?.message}>
          <Input id="age" type="number" min={18} hasError={!!errors.age} {...register('age')} />
        </FormField>

        <FormField label="Gender" htmlFor="gender" error={errors.gender?.message}>
          <Select
            id="gender"
            placeholder="Select gender"
            options={GENDER_OPTIONS}
            hasError={!!errors.gender}
            {...register('gender')}
          />
        </FormField>
      </div>

      <FormField
        label="Skills"
        htmlFor="skills"
        error={errors.skills?.message}
        hint="Comma separated, e.g. React, Node.js, MongoDB"
      >
        <Input id="skills" hasError={!!errors.skills} {...register('skills')} />
      </FormField>

      <FormField label="Photo URL" htmlFor="photoUrl" error={errors.photoUrl?.message}>
        <Input id="photoUrl" type="url" hasError={!!errors.photoUrl} {...register('photoUrl')} />
      </FormField>

      <ErrorMessage error={updateProfileMutation.error} />

      <div className="flex justify-end">
        <Button type="submit" isLoading={updateProfileMutation.isPending} disabled={!isDirty}>
          Save changes
        </Button>
      </div>
    </form>
  )
}

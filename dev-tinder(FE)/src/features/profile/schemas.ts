import { z } from 'zod'
import type { Gender, User } from '@/types/user'

export const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

/**
 * Form values are kept as strings (that's what inputs give us).
 * toProfilePayload() converts them into what the API expects.
 */
export const profileSchema = z.object({
  firstName: z.string().trim().min(3, 'First name should be at least 3 characters'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  age: z
    .string()
    .trim()
    .refine((value) => value === '' || (Number.isInteger(Number(value)) && Number(value) >= 18), {
      message: 'Age must be a whole number, 18 or above',
    }),
  gender: z.enum(['', 'male', 'female', 'other']),
  skills: z.string(),
  photoUrl: z
    .string()
    .trim()
    .refine((value) => value === '' || z.string().url().safeParse(value).success, {
      message: 'Enter a valid URL',
    }),
})

export type ProfileFormValues = z.infer<typeof profileSchema>

export type ProfilePayload = Partial<
  Pick<User, 'firstName' | 'lastName' | 'age' | 'gender' | 'skills' | 'photoUrl'>
>

export function toProfileFormValues(user: User): ProfileFormValues {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age?.toString() ?? '',
    gender: user.gender ?? '',
    skills: user.skills?.join(', ') ?? '',
    photoUrl: user.photoUrl ?? '',
  }
}

export function toProfilePayload(values: ProfileFormValues): ProfilePayload {
  const payload: ProfilePayload = {
    firstName: values.firstName,
    lastName: values.lastName,
    skills: values.skills
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean),
  }
  if (values.age) payload.age = Number(values.age)
  if (values.gender) payload.gender = values.gender
  if (values.photoUrl) payload.photoUrl = values.photoUrl
  return payload
}

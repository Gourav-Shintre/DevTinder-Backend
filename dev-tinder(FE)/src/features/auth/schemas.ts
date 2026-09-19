import { z } from 'zod'

// Keep these rules in sync with dev-tinder/src/utlis/signupVaidation.js

export const loginSchema = z.object({
  emailId: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const signupSchema = z.object({
  firstName: z.string().trim().min(2, 'First name should be at least 2 characters'),
  lastName: z.string().trim().min(2, 'Last name should be at least 2 characters'),
  emailId: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(8, 'Password should be at least 8 characters'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type SignupFormValues = z.infer<typeof signupSchema>

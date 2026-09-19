export type Gender = 'male' | 'female' | 'other'

/** A user as returned by the backend (password is never included). */
export interface User {
  _id: string
  firstName: string
  lastName: string
  emailId?: string
  age?: number
  gender?: Gender
  skills?: string[]
  photoUrl?: string
}

/** Standard success envelope used by the backend: { message, data }. */
export interface ApiResponse<TData> {
  message: string
  data: TData
}

import { httpClient } from '@/api/httpClient'
import type { ApiResponse, User } from '@/types/user'
import type { LoginFormValues, SignupFormValues } from './schemas'

export async function login(credentials: LoginFormValues): Promise<User> {
  const response = await httpClient.post<ApiResponse<User>>('/auth/login', credentials)
  return response.data
}

export async function signup(values: SignupFormValues): Promise<User> {
  const response = await httpClient.post<ApiResponse<User>>('/auth/signup', values)
  return response.data
}

export async function logout(): Promise<void> {
  await httpClient.post('/auth/logout')
}

export async function fetchCurrentUser(): Promise<User> {
  const response = await httpClient.get<ApiResponse<User>>('/user/')
  return response.data
}

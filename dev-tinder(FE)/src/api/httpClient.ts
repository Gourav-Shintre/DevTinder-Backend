import { ApiError, extractErrorMessage } from './ApiError'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

interface RequestOptions {
  method?: HttpMethod
  body?: unknown
}

/** Parse the response as JSON when possible, otherwise as text. */
async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

/**
 * The single place the app talks to the backend.
 * - sends/receives the auth cookie (credentials: 'include')
 * - throws ApiError for any non-2xx response
 */
async function request<TResponse>(path: string, options: RequestOptions = {}): Promise<TResponse> {
  const { method = 'GET', body } = options
  const endpoint = `${method} ${path}`

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      credentials: 'include',
      headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    // fetch only rejects on network failure (backend down, proxy unreachable)
    throw new ApiError('Cannot reach the server. Is the backend running?', 0, endpoint)
  }

  const data = await parseBody(response)

  if (!response.ok) {
    const message = extractErrorMessage(data, `Request failed with status ${response.status}`)
    if (import.meta.env.DEV) {
      console.error(`[api] ${endpoint} -> ${response.status}`, data)
    }
    throw new ApiError(message, response.status, endpoint)
  }

  return data as TResponse
}

export const httpClient = {
  get: <TResponse>(path: string) => request<TResponse>(path),
  post: <TResponse>(path: string, body?: unknown) =>
    request<TResponse>(path, { method: 'POST', body }),
  patch: <TResponse>(path: string, body?: unknown) =>
    request<TResponse>(path, { method: 'PATCH', body }),
}

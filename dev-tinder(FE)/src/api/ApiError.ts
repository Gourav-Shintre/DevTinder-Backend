/**
 * Every failed request is turned into an ApiError, so components and hooks
 * only ever deal with one error shape: a readable message + HTTP status.
 */
export class ApiError extends Error {
  readonly status: number
  readonly endpoint: string

  constructor(message: string, status: number, endpoint: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.endpoint = endpoint
  }

  get isUnauthorized(): boolean {
    return this.status === 401
  }
}

/**
 * The backend sends errors in different shapes depending on the route:
 * plain text, { message }, or { error }. Pick whichever is present.
 */
export function extractErrorMessage(body: unknown, fallback: string): string {
  if (typeof body === 'string' && body.trim()) return body
  if (body && typeof body === 'object') {
    const { message, error } = body as { message?: unknown; error?: unknown }
    if (typeof message === 'string' && message) return message
    if (typeof error === 'string' && error) return error
  }
  return fallback
}

/** Turn any thrown value into a message that is safe to show in the UI. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return 'Something went wrong'
}

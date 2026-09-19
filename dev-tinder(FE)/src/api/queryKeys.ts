/**
 * All TanStack Query keys live here, so invalidation is consistent
 * and every key is easy to find in React Query Devtools.
 */
export const queryKeys = {
  currentUser: ['currentUser'] as const,
  feed: ['feed'] as const,
  requests: ['requests'] as const,
  connections: ['connections'] as const,
}

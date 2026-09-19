import type { ConnectionRequest } from '@/types/connectionRequest'
import type { User } from '@/types/user'

/**
 * A connection stores both sides (fromUserId / toUserId).
 * Return whichever side is NOT the logged-in user.
 */
export function getOtherUser(connection: ConnectionRequest, currentUserId: string): User {
  return connection.fromUserId._id === currentUserId ? connection.toUserId : connection.fromUserId
}

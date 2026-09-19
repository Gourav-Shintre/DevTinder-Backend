import type { User } from './user'

export type SendRequestStatus = 'interested' | 'ignored'
export type ReviewRequestStatus = 'accepted' | 'rejected'
export type ConnectionRequestStatus = SendRequestStatus | ReviewRequestStatus

/** A connection request with the user references populated by the backend. */
export interface ConnectionRequest {
  _id: string
  fromUserId: User
  toUserId: User
  status: ConnectionRequestStatus
}

/** GET /user/getAllRequests populates only fromUserId; toUserId stays an id. */
export interface IncomingRequest extends Omit<ConnectionRequest, 'toUserId'> {
  toUserId: string
}

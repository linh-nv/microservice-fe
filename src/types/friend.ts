export interface FriendRequest {
  id: string;
  name: string;
  avatarUrl: string;
  mutualFriends: number;
  status: "pending" | "accepted" | "declined";
}

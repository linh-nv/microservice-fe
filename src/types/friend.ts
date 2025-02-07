export interface UserProfile {
  id: string;
  avatarUrl?: string;
  bio?: string;
}

export interface FriendRequest {
  id: string;
  senderId: string;
  fullName: string;
  profile: UserProfile;
  createdAt: Date;
}

export interface PaginationMeta {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

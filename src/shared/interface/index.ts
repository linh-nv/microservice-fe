import { FriendOrderBy, FriendSortBy, RoleType, Status } from "../enums";
export * from "./user";

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: RoleType;
  status: Status;
  params?: JSON;
}

export interface GetFriendsOptions {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: FriendSortBy;
  orderBy?: FriendOrderBy;
}

export interface Friends {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  profile: {
    id: string;
    avatarUrl?: string;
    bio?: string;
    birthday?: string;
    location?: string;
  };
  fullName: string;
}
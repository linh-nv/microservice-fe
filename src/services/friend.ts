import { GetFriendsOptions } from "../shared/interface";
import axiosInstance from "./axios";

export const friendService = {
  async getPendingRequests(options: number) {
    const response = await axiosInstance.get("/friends/requests/pending", {
      params: {
        options,
      },
    });

    return response.data;
  },

  async rejectFriendRequest(receiverId: string) {
    return await axiosInstance.delete(`/friends/requests/${receiverId}/reject`);
  },

  async getSendPendingRequests(options: number) {
    const response = await axiosInstance.get("/friends/requests/send/pending", {
      params: {
        options,
      },
    });

    return response.data;
  },

  async getFriendSuggestions(options: number) {
    const response = await axiosInstance.get("/friends/suggestions", {
      params: {
        options,
      },
    });
    return response.data;
  },

  async acceptInvitation(receiverId: string) {
    return await axiosInstance.post(`/friends/requests/${receiverId}/accept`);
  },

  async sendInvitation(receiverId: string) {
    return await axiosInstance.post(`/friends/requests/send/${receiverId}`);
  },

  async deleteInvitation(receiverId: string) {
    return await axiosInstance.delete(
      `/friends/requests/send/${receiverId}/delete`
    );
  },

  async getFriends(options?: GetFriendsOptions) {
    const response = await axiosInstance.get(`/friends`, {
      params: {
        options,
      },
    });

    return response.data;
  },
};

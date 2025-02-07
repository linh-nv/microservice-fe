import axiosInstance from "./axios";

export const friendService = {
  async getPendingRequests(page: number) {
    const response = await axiosInstance.get("/friends/requests/pending", {
      params: {
        page: Number(page),
      },
    });

    return response.data;
  },

  async rejectFriendRequest(receiverId: string) {
    return await axiosInstance.delete(`/friends/requests/${receiverId}/reject`);
  },

  async getSendPendingRequests(page: number) {
    const response = await axiosInstance.get("/friends/requests/send/pending", {
      params: {
        page: Number(page),
      },
    });

    return response.data;
  },

  async getFriendSuggestions(page: number) {
    const response = await axiosInstance.get("/friends/suggestions", {
      params: {
        page: Number(page),
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
    return await axiosInstance.delete(`/friends/requests/send/${receiverId}/delete`);
  },
};

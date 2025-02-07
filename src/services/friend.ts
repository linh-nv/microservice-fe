import axiosInstance from "./axios";

export const friendService = {
  async getPendingRequests() {
    const response = await axiosInstance.get("/friends/requests/pending");

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
};

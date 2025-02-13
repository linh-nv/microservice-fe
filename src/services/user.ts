import axiosInstance from "./axios";

export const userService = {
  async getUser(id: string) {
    const response = await axiosInstance.get(`user/${id}`);
    return response.data;
  },
};

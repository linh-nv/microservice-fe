import axios, { AxiosResponse } from "axios";
import { cookie } from "./cookie";
import axiosInstance from "./axios";
import { Login, Register } from "../shared/interface";

export const authService = {
  async login(credentials: Login) {
    const response = await axiosInstance.post('/login', credentials);
    console.log(response.data);
    
    cookie.setToken(response.data);

    return response.data;
  },

  async logout() {
    await axiosInstance.post(`/logout`);
    cookie.removeTokens();
  },

  async changePassword(credentials: Login) {
    await axiosInstance.post(`/change-password`, credentials);
  },

  async register(credentials: Register) {
    const response = await axios.post(`/register`, credentials);

    return response.data;
  },

  async refreshToken() {
    const refreshToken = cookie.getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token available");

    const response: AxiosResponse = await axios.post(`/refresh`, {
        refreshToken: refreshToken,
    });
    cookie.setToken(response.data);

    return response.data;
  },
};

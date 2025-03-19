import axios, { AxiosResponse } from "axios";
import { cookie } from "./cookie";
import axiosInstance from "./axios";
import { Login, Register } from "../shared/interface";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
  async login(credentials: Login) {
    const response = await axiosInstance.post('/login', credentials);
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
    const response = await axios.post(`${API_BASE_URL}/register`, credentials);

    return response.data;
  },

  // async refreshToken() {
  //   const refreshToken = cookie.getRefreshToken();
  //   if (!refreshToken) throw new Error("No refresh token available");
  //   console.log(refreshToken);
    
  //   const response: AxiosResponse = await axios.post(`${API_BASE_URL}/refresh-token`, {
  //       refreshToken: refreshToken,
  //       deviceId: cookie.getDeviceId(),
  //   });
  //   console.log(response.data);
    
  //   cookie.setToken(response.data);

  //   return response.data;
  // },

  async refreshToken() {
    const refreshToken = cookie.getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post(`http://localhost:8000/api/refresh`, {
      refresh_token: refreshToken,
    });
    cookie.setToken(response.data.data);

    return response.data;
  },
};

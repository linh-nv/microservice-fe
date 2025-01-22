import axios, { AxiosResponse } from "axios";
import { cookie } from "./cookie";
import { endpoint } from "../config/endpoint";
import axiosInstance from "./axios";
import { Login, Register } from "../shared/interface";

const AUTH_URL = endpoint.api.auth;

export const authService = {
  async login(credentials: Login) {
    const response = await axiosInstance.post(`${AUTH_URL}/login`, credentials);
    cookie.setToken(response.data.data);

    return response.data;
  },

  async logout() {
    await axiosInstance.post(`${AUTH_URL}/logout`);
    cookie.removeTokens();
  },

  async changePassword(credentials: Login) {
    await axiosInstance.post(`${AUTH_URL}/change-password`, credentials);
  },

  async register(credentials: Register) {
    const response = await axios.post(`${AUTH_URL}/register`, credentials);

    return response.data;
  },

  async refreshToken() {
    const refreshToken = cookie.getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token available");

    const response: AxiosResponse = await axios.post(`${AUTH_URL}/refresh`, {
        refreshToken: refreshToken,
    });
    cookie.setToken(response.data);

    return response.data;
  },
};

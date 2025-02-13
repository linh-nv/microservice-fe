import axios from "axios";
import { cookie } from "./cookie";
import { authService } from "./auth";
import { routes } from "../routes/routes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = cookie.getAccessToken();
    
    const accessTokenExpires = cookie.getAccessTokenExpires();
    const now = new Date().getTime();

    // Kiểm tra nếu access token đã hết hạn
    if (accessTokenExpires && now > accessTokenExpires) {
      try {
        const response = await authService.refreshToken();
        accessToken = response.data.token;
      } catch (error) {
        cookie.removeTokens();
        window.location.href = routes.auth.login;

        return Promise.reject(error);
      }
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    try {
      if (error.response.status == 401) {
        await authService.refreshToken();

        return axiosInstance(error.config);
      }
    } catch (refreshError) {
      // cookie.removeTokens();
      // location.replace(routes.errors[401]);

      return Promise.reject(refreshError);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

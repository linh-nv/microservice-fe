import Cookies from "js-cookie";
import axiosInstance from "./axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const cookie = {
  async setToken(tokenData: any) {
    const { access_token, refresh_token, expires_in, refresh_expires_in } =
      tokenData || {};

    if (!access_token || !refresh_token) {
      console.error("Access token or refresh token is missing.");
      return;
    }

    const accessTokenExpires = new Date(
      new Date().getTime() + expires_in * 60 * 1000
    );
    const refreshTokenExpires = new Date(
      new Date().getTime() + refresh_expires_in * 60 * 1000
    );

    Cookies.set("client_access_token", access_token, {
      expires: accessTokenExpires,
    });
    Cookies.set("client_refresh_token", refresh_token, {
      expires: refreshTokenExpires,
    });
    Cookies.set(
      "client_access_token_expires",
      accessTokenExpires.getTime().toString()
    );
    Cookies.set(
      "client_refresh_token_expires",
      refreshTokenExpires.getTime().toString()
    );
  },

  getId() {
    return Cookies.get("client_id");
  },

  getAccessToken() {
    return Cookies.get("client_access_token");
  },

  getRefreshToken() {
    return Cookies.get("client_refresh_token");
  },

  getAccessTokenExpires() {
    return Cookies.get("client_access_token_expires");
  },

  getRefreshTokenExpires() {
    return Cookies.get("client_refresh_token_expires");
  },

  removeTokens() {
    Cookies.remove("client_access_token");
    Cookies.remove("client_refresh_token");
    Cookies.remove("client_access_token_expires");
    Cookies.remove("client_refresh_token_expires");
  },
};

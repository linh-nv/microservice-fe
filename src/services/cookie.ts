import Cookies from "js-cookie";

export const cookie = {
  setToken(tokenData: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    refresh_expires_in: number;
  }) {
    const { access_token, refresh_token, expires_in, refresh_expires_in } =
      tokenData || {};

    if (!access_token || !refresh_token) {
      console.error("Access token or refresh token is missing.");
      return;
    }

    const accessTokenExpires = new Date(
      new Date().getTime() + expires_in * 1000
    );
    const refreshTokenExpires = new Date(
      new Date().getTime() + refresh_expires_in * 1000
    );

    Cookies.set("access_token", access_token, { expires: accessTokenExpires });
    Cookies.set("refresh_token", refresh_token, {
      expires: refreshTokenExpires,
    });
    Cookies.set(
      "access_token_expires",
      accessTokenExpires.getTime().toString()
    );
    Cookies.set(
      "refresh_token_expires",
      refreshTokenExpires.getTime().toString()
    );
  },

  getAccessToken() {
    return Cookies.get("access_token");
  },

  getRefreshToken() {
    return Cookies.get("refresh_token");
  },

  getAccessTokenExpires() {
    const expires = Cookies.get("access_token_expires");
    return expires ? parseInt(expires, 10) : null;
  },

  getRefreshTokenExpires() {
    const expires = Cookies.get("refresh_token_expires");
    return expires ? parseInt(expires, 10) : null;
  },

  removeTokens() {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("access_token_expires");
    Cookies.remove("refresh_token_expires");
  },
};

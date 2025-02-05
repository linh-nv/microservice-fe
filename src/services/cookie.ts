import Cookies from "js-cookie";

export const cookie = {
  setToken(tokenData: {
    token: string;
    refreshToken: string;
    expiredAt: string;
  }) {
    const { token, refreshToken, expiredAt } = tokenData;

    if (!token || !refreshToken || !expiredAt) {
      console.error(
        "Access token, refresh token, or expiration date is missing."
      );
      return;
    }

    const accessTokenExpires = new Date(expiredAt);
    const refreshTokenExpires = new Date();
    refreshTokenExpires.setDate(refreshTokenExpires.getDate() + 7);

    Cookies.set("access_token", token, { expires: accessTokenExpires });
    Cookies.set("refresh_token", refreshToken, {
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

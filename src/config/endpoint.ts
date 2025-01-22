export const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000/api/v1";

export const endpoint = {
  api: {
    auth: {
      login: `${API_BASE_URL}/login`,
      register: `${API_BASE_URL}/register`,
      refreshToken: `${API_BASE_URL}/refresh-token`,
    },
    user: {
      getProfile: `${API_BASE_URL}/user/profile`,
      updateProfile: `${API_BASE_URL}/user/update`,
    },
    admin: {
      dashboard: `${API_BASE_URL}/admin/dashboard`,
      manageUsers: `${API_BASE_URL}/admin/users`,
    },
  },

  error: {
    400: "/error/400",
    401: "/error/401",
    403: "/error/403",
    404: "/error/404",
    500: "/error/500",
  },

  timeout: 5000,
};

export const routes = {
  home: "home",
  friend: {
    home: "/friend",
    all: "/friend/list",
    detail: "/friend/list/:id",
    getDetail: (id: string) => `/friend/list/${id}`,
  },
  auth: {
    login: "login",
    register: "register",
    refreshToken: "refresh-token",
  },
  user: {
    getProfile: "userprofile",
    updateProfile: "userupdate",
  },
  admin: {
    dashboard: "admindashboard",
    manageUsers: "adminusers",
  },
  chat: "chat",
  errors: {
    400: "errors/400",
    401: "errors/401",
    403: "errors/403",
    404: "errors/404",
    500: "errors/500",
  },
};

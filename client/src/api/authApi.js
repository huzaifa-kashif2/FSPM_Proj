import axiosInstance from "./axiosInstance";

export const authApi = {
  signup: (data) => axiosInstance.post("/auth/signup", data),
  login: (data) => axiosInstance.post("/auth/login", data),
  logout: () => axiosInstance.post("/auth/logout"),
  verify: (token) => axiosInstance.post("/auth/verify", { token }),
  updateProfile: (data) => axiosInstance.put("/auth/profile", data),
  getMfaSettings: () => axiosInstance.get("/auth/mfa-settings"),
  updateMfaSettings: (data) => axiosInstance.put("/auth/mfa-settings", data),
};

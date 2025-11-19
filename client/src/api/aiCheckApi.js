import axiosInstance from "./axiosInstance";

export const aiCheckApi = {
  checkText: (text) => axiosInstance.post("/ai-check/check", { text }),
};

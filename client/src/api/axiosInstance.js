import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      try {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
      } catch {}
      if (typeof window !== "undefined") {
        const current = window.location.pathname;
        if (current !== "/signin") {
          window.location.replace("/signin");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

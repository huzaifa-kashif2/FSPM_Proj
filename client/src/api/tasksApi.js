import axiosInstance from "./axiosInstance";

export const tasksApi = {
  getTasks: () => axiosInstance.get("/tasks"),
  getTaskById: (id) => axiosInstance.get(`/tasks/${id}`),
  createTask: (data) => axiosInstance.post("/tasks", data),
  updateTask: (id, data) => axiosInstance.put(`/tasks/${id}`, data),
  deleteTask: (id) => axiosInstance.delete(`/tasks/${id}`),
};

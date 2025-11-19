import axiosInstance from "./axiosInstance";

export const notesApi = {
  getNotes: () => axiosInstance.get("/notes"),
  getNotesByUser: (userId) => axiosInstance.get(`/notes/user/${userId}`),
  getNoteById: (id) => axiosInstance.get(`/notes/${id}`),
  createNote: (data) => axiosInstance.post("/notes", data),
  updateNote: (id, data) => axiosInstance.put(`/notes/${id}`, data),
  deleteNote: (id) => axiosInstance.delete(`/notes/${id}`),
};

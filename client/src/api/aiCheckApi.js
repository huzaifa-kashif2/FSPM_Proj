import axiosInstance from "./axiosInstance";

export const aiCheckApi = {
  // Existing text check (retained for backward compatibility)
  // checkText: (text) => axiosInstance.post("/check", { text }),
  // Upload a document for plagiarism checking
  uploadDocument: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosInstance.post("/check", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

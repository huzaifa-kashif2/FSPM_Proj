import { useContext } from "react";
import { AuthProvider } from "./AuthProvider";

// Custom hook for easy access to auth data
export const useAuth = () => {
  return useContext(AuthProvider);
};

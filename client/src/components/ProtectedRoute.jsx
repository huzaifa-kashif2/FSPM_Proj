import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  // If NOT authenticated, redirect to sign-in, saving the intended destination
  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If authenticated, render the nested route elements
  return <Outlet />;
};

export default ProtectedRoute;

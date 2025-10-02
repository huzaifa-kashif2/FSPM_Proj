import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const ProtectedRoute = () => {
  // Access the authentication state from the global context
  const auth = useAuth();
  const location = useLocation();

  // 1. Check Loading State
  // We must wait for the AuthProvider to finish checking the token in localStorage
  // and verifying it with the backend (this is the initial useEffect in AuthProvider).
  if (auth.loading) {
    // You can replace this with a beautiful spinner or splash screen
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem",
          color: "#319795",
        }}
      >
        Authenticating...
      </div>
    );
  }

  // 2. Check Authentication Status
  if (!auth.isAuthenticated) {
    // If NOT authenticated, redirect to sign-in, saving the intended destination
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // 3. Render Private Content
  // If authenticated, render the nested route elements (e.g., PrivateLayout and Dashboard)
  return <Outlet />;
};

export default ProtectedRoute;

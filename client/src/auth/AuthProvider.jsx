import React, { createContext, useState, useEffect } from "react";
import { verifyToken } from "./AuthHelpers";

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  // user will hold { id, name, email, token } or null
  const [user, setUser] = useState(null);
  // loading is true until we check the token status on initial load
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // 3. Logic to check for token on load and verify it
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        // 💡 Actual verification call to the backend
        const verifiedUser = await verifyToken(token);

        if (verifiedUser) {
          // If verification succeeds, set the full user object
          setUser(verifiedUser);
        } else {
          // If verification fails (expired/invalid), clear the token
          localStorage.removeItem("authToken");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []); // Run only once on mount

  // 4. Sign In function (called after successful API login)
  const signIn = (token, userData) => {
    localStorage.setItem("authToken", token);
    // Store user data along with the token
    setUser({ ...userData, token });
  };

  // 5. Sign Out function
  const signOut = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    // Optionally: Redirect user to the login page immediately after sign out
    // window.location.href = '/signin';
  };

  // 6. Value provided to the rest of the application
  const value = { user, signIn, signOut, loading, isAuthenticated };

  // Show a loading screen while we verify the initial token status
  if (loading) {
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
        Verifying Session...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 7. Custom hook for easy access to auth data
// Moved to useAuth.js for Fast Refresh compatibility

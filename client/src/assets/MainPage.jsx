import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        gap: "20px",
      }}
    >
      <h1>Welcome to the App</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

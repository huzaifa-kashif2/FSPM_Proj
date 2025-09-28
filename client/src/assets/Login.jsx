import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, token }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login Successful with MFA");
      } else {
        setMessage(`❌ ${data.message || "Login failed"}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("❌ Something went wrong. Check console.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Login with MFA</h1>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          placeholder="6-digit MFA Code"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
          maxLength={6}
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "20px", textAlign: "center", fontWeight: "bold" }}>{message}</p>
      )}
    </div>
  );
}

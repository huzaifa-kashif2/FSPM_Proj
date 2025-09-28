import React, { useState } from "react";

export default function QRCodeBuilder() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qrCode, setQrCode] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.qrCode) {
        setQrCode(data.qrCode);
      } else {
        alert("Signup failed or QR code not returned");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Signup</h1>

      {!qrCode ? (
        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
            Signup
          </button>
        </form>
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>Scan this QR Code</h2>
          <img
            src={qrCode}
            alt="MFA QR Code"
            style={{
              width: "256px",
              height: "256px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          />
          <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
            Open Google Authenticator and scan this code to enable MFA.
          </p>
        </div>
      )}
    </div>
  );
}

// SignUp.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { authApi } from "../api/authApi";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);
    try {
      //Send the request to the server
      const response = await authApi.signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      const data = response?.data || {};
      console.log("Signup Response: ", data);
      if (data.qrCode) {
        setQrCode(data.qrCode);
      } else if (data.message) {
        setError(data.message);
      } else {
        setError("Signup completed, but no QR code returned.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      const msg =
        err?.response?.data?.message || "Signup failed. Please try again.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    // Outer container for centering and light background
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7fafc",
        padding: "20px",
      }}
    >
      {/* Centered Sign Up Card (Slightly wider than Sign In to fit more fields) */}
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "450px", width: "100%", borderRadius: "1rem" }}
      >
        <div className="card-body">
          {/* Brand Logo - Teal Accent */}
          <h2 className="text-center mb-4 fw-bold">
            <span style={{ color: "#319795" }}>Organizer</span>
          </h2>

          {!qrCode ? (
            <>
              <h4 className="text-center mb-4 fw-bold text-dark">
                Create Your Account
              </h4>

              {error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : null}

              <form>
                {/* Full Name Input */}
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label text-muted">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    placeholder="Enter your full name"
                    required
                    onChange={handleChange}
                  />
                </div>

                {/* Email Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-muted">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    placeholder="name@example.com"
                    required
                    onChange={handleChange}
                  />
                </div>

                {/* Password Input */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-muted">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    placeholder="Create a password"
                    required
                    onChange={handleChange}
                  />
                </div>

                {/* Confirm Password Input */}
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label text-muted"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    placeholder="Repeat password"
                    required
                    onChange={handleChange}
                  />
                </div>

                {/* Sign Up Button - Solid Teal */}
                <button
                  type="submit"
                  className="btn w-100 fw-bold py-2 text-white mb-3"
                  onClick={handleClick}
                  disabled={isSubmitting}
                  style={{ backgroundColor: "#319795", borderColor: "#319795" }}
                >
                  {isSubmitting ? "Creating Account..." : "Sign Up"}
                </button>

                {/* Already Have Account link */}
                <hr className="my-4" />

                <p className="text-center text-muted small">
                  Already have an account?
                  <Link
                    to="/signin"
                    className="text-decoration-none fw-bold ms-1"
                    style={{ color: "#319795" }}
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </>
          ) : (
            <>
              <h4 className="text-center mb-3 fw-bold text-dark">Enable MFA</h4>
              <p className="text-center text-muted mb-4">
                Scan this QR code with Google Authenticator to finish setup.
              </p>
              <div className="d-flex flex-column align-items-center">
                <img
                  src={qrCode}
                  alt="MFA QR Code"
                  style={{
                    width: "256px",
                    height: "256px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.5rem",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                  }}
                />
                <p className="text-center text-muted small mt-3">
                  After scanning, use your 6‑digit code to sign in.
                </p>
                <Link
                  to="/signin"
                  className="btn fw-bold mt-3 text-white"
                  style={{ backgroundColor: "#319795", borderColor: "#319795" }}
                >
                  Go to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;

// SignIn.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [buttonClick, setButtonClick] = useState(false);
  const [formError, setFormError] = useState("");
  const [showMfa, setShowMfa] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [mfaSubmitting, setMfaSubmitting] = useState(false);
  const [mfaError, setMfaError] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }
    // First validate credentials with server; only show MFA if valid
    setButtonClick(true);
    setFormError("");
    try {
      const { data } = await authApi.login({
        email: formData.email,
        password: formData.password,
      });
      // If server indicates MFA is required, open the MFA modal
      if (data?.mfaRequired) {
        setShowMfa(true);
      } else if (data?.token) {
        // MFA is disabled, proceed with login directly
        localStorage.setItem("authToken", data.token);
        if (data?.user) {
          localStorage.setItem("authUser", JSON.stringify(data.user));
          setUser(data.user);
        }
        navigate("/dashboard", { replace: true });
      } else {
        // Fallback: unexpected response
        setFormError("Unexpected response from server.");
      }
      if (data?.user && !data?.token) {
        setUser(data.user);
      }
    } catch (error) {
      setFormError(error?.response?.data?.message || "Invalid credentials");
    } finally {
      setButtonClick(false);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMfaSubmit = async (e) => {
    e.preventDefault();
    if (!mfaCode || mfaCode.length < 4) {
      setMfaError("Please enter your MFA code.");
      return;
    }
    setMfaError("");
    setMfaSubmitting(true);
    setButtonClick(true);
    try {
      const { data } = await authApi.login({
        email: formData.email,
        password: formData.password,
        token: mfaCode,
      });
      if (data?.token) {
        localStorage.setItem("authToken", data.token);
      }
      if (data?.user) {
        localStorage.setItem("authUser", JSON.stringify(data.user));
        console.log("Logged in user:", data.user);
        setUser(data.user);
      }
      setShowMfa(false);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setMfaError(
        error?.response?.data?.message || "Invalid code or login failed."
      );
    } finally {
      setMfaSubmitting(false);
      setButtonClick(false);
    }
  };

  const handleMfaCancel = () => {
    setShowMfa(false);
    setMfaCode("");
    setMfaError("");
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
      {/* Centered Sign In Card */}
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "1rem" }}
      >
        <div className="card-body">
          {/* Brand Logo - Teal Accent */}
          <h2 className="text-center mb-4 fw-bold">
            <span style={{ color: "#319795" }}>Organizer</span>
          </h2>

          <h4 className="text-center mb-4 fw-bold text-dark">
            Sign In to Your Account
          </h4>

          <form>
            {formError && (
              <div className="alert alert-danger py-2" role="alert">
                {formError}
              </div>
            )}
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
            <div className="mb-4">
              <label htmlFor="password" className="form-label text-muted">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                placeholder="Enter your password"
                required
                onChange={handleChange}
              />
            </div>

            {/* Sign In Button - Solid Teal */}
            <button
              type="submit"
              className="btn w-100 fw-bold py-2 text-white mb-3"
              style={{ backgroundColor: "#319795", borderColor: "#319795" }}
              onClick={handleClick}
              disabled={buttonClick}
            >
              Sign In
            </button>

            {/* Forgot Password Link */}
            <p className="text-center small">
              <a
                href="#forgot"
                className="text-decoration-none"
                style={{ color: "#319795" }} // Use teal accent for link
              >
                Forgot Password?
              </a>
            </p>

            {/* Separator or 'No Account' link */}
            <hr className="my-4" />

            <p className="text-center text-muted small">
              Don't have an account?
              <Link
                to="/signup"
                className="text-decoration-none fw-bold ms-1"
                style={{ color: "#319795" }}
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* MFA Modal */}
      {showMfa && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="card shadow p-3"
            style={{ width: "100%", maxWidth: 400, borderRadius: "0.75rem" }}
          >
            <div className="card-body">
              <h5 className="fw-bold mb-2 text-center">Enter MFA Code</h5>
              <p className="text-muted small text-center mb-3">
                Please enter the 6-digit code from your authenticator app.
              </p>
              <form onSubmit={handleMfaSubmit}>
                <div className="mb-3">
                  <label htmlFor="mfa" className="form-label text-muted">
                    MFA Code
                  </label>
                  <input
                    id="mfa"
                    name="mfa"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    autoFocus
                    className="form-control text-center fs-5"
                    placeholder="••••••"
                    value={mfaCode}
                    onChange={(ev) => {
                      const v = ev.target.value.replace(/\D/g, "");
                      setMfaCode(v);
                    }}
                  />
                </div>
                {mfaError && (
                  <div className="alert alert-danger py-2" role="alert">
                    {mfaError}
                  </div>
                )}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn flex-fill text-white fw-bold"
                    style={{
                      backgroundColor: "#319795",
                      borderColor: "#319795",
                    }}
                    disabled={mfaSubmitting || mfaCode.length < 4}
                  >
                    {mfaSubmitting ? "Verifying..." : "Verify"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary flex-fill"
                    onClick={handleMfaCancel}
                    disabled={mfaSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;

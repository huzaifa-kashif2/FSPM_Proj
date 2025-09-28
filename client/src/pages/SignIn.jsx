// SignIn.jsx
import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
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
            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-muted">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                required
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
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Sign In Button - Solid Teal */}
            <button
              type="submit"
              className="btn w-100 fw-bold py-2 text-white mb-3"
              style={{ backgroundColor: "#319795", borderColor: "#319795" }}
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
    </div>
  );
};

export default SignIn;

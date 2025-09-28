// SignUp.jsx
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
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

          <h4 className="text-center mb-4 fw-bold text-dark">
            Create Your Account
          </h4>

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
                placeholder="Enter your full name"
                required
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
                placeholder="name@example.com"
                required
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
                placeholder="Create a password"
                required
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
                placeholder="Repeat password"
                required
              />
            </div>

            {/* Sign Up Button - Solid Teal */}
            <button
              type="submit"
              className="btn w-100 fw-bold py-2 text-white mb-3"
              style={{ backgroundColor: "#319795", borderColor: "#319795" }}
            >
              Sign Up
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
        </div>
      </div>
    </div>
  );
};

export default SignUp;

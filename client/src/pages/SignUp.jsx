// SignUp.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [buttonClick, setButtonClick] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData);
    setButtonClick(true);
    e.target.innerText = "Creating Account...";
    e.target.disabled = buttonClick;

    //Send the request to the server
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

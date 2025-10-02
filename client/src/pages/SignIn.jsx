// SignIn.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [buttonClick, setButtonClick] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData);
    setButtonClick(true);
    e.target.innerText = "Signing In...";
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

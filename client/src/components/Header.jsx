import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container d-flex justify-content-between align-items-center py-3">
        {/* Brand Logo - Custom Teal Color */}
        <a
          href="/"
          className="text-decoration-none fw-bold fs-4"
          style={{ color: "#319795" }}
        >
          Organizer
        </a>

        {/* Navigation Links */}
        <nav className="d-none d-md-flex gap-4">
          <a href="#features" className="text-dark text-decoration-none">
            Features
          </a>
          <a href="#pricing" className="text-dark text-decoration-none">
            Pricing
          </a>
          <a href="#signin" className="text-dark text-decoration-none">
            Sign In
          </a>
        </nav>

        {/* Sign Up Button - Solid Teal */}
        <a
          href="#signup"
          className="btn rounded-pill text-white fw-bold px-4"
          style={{ backgroundColor: "#319795", borderColor: "#319795" }}
        >
          Sign Up
        </a>
      </div>
    </header>
  );
}

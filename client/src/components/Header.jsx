import React, { useState } from "react";
// Since we are not using react-router-dom in this single file,
// we will replace 'Link' with a simple 'a' tag for demonstration,
// and assume routing logic would be handled elsewhere.
// For a complete React project, you'd re-import { Link } from "react-router-dom";
// and use <Link> tags for internal routes like /signin and /signup.

// Mock Link component for single-file compilation and usage of 'to' prop
const Link = (props) => <a href={props.to} {...props} />;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const accentColor = "#319795";

  // Function to close the menu, useful when a link is clicked
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container d-flex justify-content-between align-items-center py-3">
        {/* Brand Logo - Left Aligned */}
        <Link
          to="/"
          className="text-decoration-none fw-bold fs-4"
          style={{ color: accentColor, minWidth: "120px" }} // Added min-width to ensure logo space
        >
          Organizer
        </Link>

        {/* 1. CENTRAL NAVIGATION LINKS (Desktop Only) 
          - d-none d-md-flex: Visible only on desktop.
          - flex-grow-1: Takes up all available space between the logo and the buttons.
          - justify-content-center: Centers the links within the space they occupy.
          - mx-4: Adds horizontal margin for visual separation.
        */}
        <nav className="d-none d-md-flex flex-grow-1 justify-content-center gap-4 mx-4">
          <a
            href="/#features"
            className="text-dark text-decoration-none py-2 hover:text-teal-600"
          >
            Features
          </a>
          <a
            href="/#about"
            className="text-dark text-decoration-none py-2 hover:text-teal-600"
          >
            About Us
          </a>
          <a
            href="/#contact"
            className="text-dark text-decoration-none py-2 hover:text-teal-600"
          >
            Contact
          </a>
        </nav>

        {/* 2. RIGHT ALIGNED LINKS (Desktop) & HAMBURGER (Mobile) 
          This group remains right-aligned.
        */}
        <div className="d-flex align-items-center gap-3">
          {/* Desktop Sign In/Sign Up Links (d-none d-md-flex) */}
          <div className="d-none d-md-flex align-items-center gap-3">
            <Link to="/signin" className="text-dark text-decoration-none">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="btn rounded-pill text-white fw-bold px-4"
              style={{ backgroundColor: accentColor, borderColor: accentColor }}
            >
              Sign Up
            </Link>
          </div>

          {/* Hamburger Icon (Visible on small screens, hidden on md+) */}
          <button
            className="btn d-md-none p-0 border-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            {/* Simple X or Hamburger Icon based on state */}
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 3. Mobile Off-Canvas Menu */}
      <div
        className={`d-md-none bg-white w-100 shadow-lg position-absolute z-3 ${
          isMenuOpen ? "d-block" : "d-none"
        }`}
        style={{ top: "60px", left: 0 }} // Position below the header bar
      >
        <div className="d-flex flex-column p-4 gap-3">
          {/* Nav Links */}
          <a
            href="/#features"
            className="text-dark text-decoration-none fs-5 py-2 border-bottom"
            onClick={closeMenu}
          >
            Features
          </a>
          <a
            href="/#about"
            className="text-dark text-decoration-none fs-5 py-2 border-bottom"
            onClick={closeMenu}
          >
            About Us
          </a>
          <a
            href="/#contact"
            className="text-dark text-decoration-none fs-5 py-2 border-bottom"
            onClick={closeMenu}
          >
            Contact
          </a>

          {/* Sign In Link (Mobile) */}
          <Link
            to="/signin"
            className="text-dark text-decoration-none fs-5 py-2 border-bottom"
            onClick={closeMenu}
          >
            Sign In
          </Link>

          {/* Sign Up Button (Mobile) */}
          <Link
            to="/signup"
            className="btn w-100 rounded-pill text-white fw-bold py-2 mt-2"
            style={{ backgroundColor: accentColor, borderColor: accentColor }}
            onClick={closeMenu}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

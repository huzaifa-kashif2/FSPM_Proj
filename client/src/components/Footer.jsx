// Footer.jsx
import React from "react";

const Footer = () => (
  <footer className="bg-white border-top mt-5 pt-4 pb-3">
    <div className="container">
      <div className="row">
        {/* Column 1: Brand & Copyright */}
        <div className="col-md-4 mb-3 mb-md-0">
          {/* Brand Name - Teal Accent */}
          <a
            href="/"
            className="text-decoration-none fw-bold fs-5"
            style={{ color: "#319795" }}
          >
            Organizer
          </a>
          {/* Copyright - Muted Text */}
          <p className="mt-2 text-muted small">
            &copy; {new Date().getFullYear()} Organizer. All rights reserved.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="col-md-4 mb-3 mb-md-0">
          <h5 className="fw-bold text-dark mb-3">Product</h5>
          <ul className="list-unstyled">
            <li className="mb-2">
              <a href="#features" className="text-muted text-decoration-none">
                Features
              </a>
            </li>
            <li className="mb-2">
              <a href="#pricing" className="text-muted text-decoration-none">
                Pricing
              </a>
            </li>
            <li className="mb-2">
              <a href="#support" className="text-muted text-decoration-none">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Legal & Resources */}
        <div className="col-md-4">
          <h5 className="fw-bold text-dark mb-3">Company</h5>
          <ul className="list-unstyled">
            <li className="mb-2">
              <a href="#about" className="text-muted text-decoration-none">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="#terms" className="text-muted text-decoration-none">
                Terms of Service
              </a>
            </li>
            <li className="mb-2">
              <a href="#privacy" className="text-muted text-decoration-none">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

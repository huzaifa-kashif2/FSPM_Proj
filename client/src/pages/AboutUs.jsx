import React from "react";

// NOTE: Since we are using standard Bootstrap classes, we are assuming
// the necessary Bootstrap CSS is loaded globally in the application environment.

/**
 * Renders the About Us page content.
 * Focuses on the mission and values of the "Organizer" app.
 */
const AboutUs = () => {
  const accentColor = "#319795"; // Custom Teal Color

  return (
    <div className="container py-5" id="about">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Main Heading and Mission */}
          <header className="text-center mb-5">
            <h1 className="display-4 fw-bolder" style={{ color: accentColor }}>
              Our Story: Simplifying Your Success
            </h1>
            <p className="lead text-muted mt-3">
              We built Organizer because the modern world is busy—your tools
              shouldn't be. Our mission is to provide the clearest path to focus
              and achievement.
            </p>
          </header>

          {/* Core Values Section */}
          <div className="row g-5">
            <div className="col-md-6">
              <h3 className="fw-bold mb-3 text-dark">The Problem We Solve</h3>
              <p className="text-secondary">
                We noticed students and professionals juggling multiple apps—a
                planner here, a to-do list there, and notes everywhere. This
                fragmentation causes stress and lost time. Organizer is the
                single, calm space where everything comes together, giving you
                back control of your schedule and your mental energy.
              </p>

              <h3 className="fw-bold mb-3 mt-4 text-dark">Our Core Values</h3>
              <ul className="list-unstyled">
                <li className="d-flex align-items-start mb-2">
                  <span className="me-2 fs-5" style={{ color: accentColor }}>
                    ✓
                  </span>
                  <div className="pt-1">
                    <strong className="text-dark">Simplicity:</strong> Tools
                    should disappear, leaving only your work.
                  </div>
                </li>
                <li className="d-flex align-items-start mb-2">
                  <span className="me-2 fs-5" style={{ color: accentColor }}>
                    ✓
                  </span>
                  <div className="pt-1">
                    <strong className="text-dark">Focus:</strong> Designed to
                    minimize distractions and maximize deep work.
                  </div>
                </li>
                <li className="d-flex align-items-start mb-2">
                  <span className="me-2 fs-5" style={{ color: accentColor }}>
                    ✓
                  </span>
                  <div className="pt-1">
                    <strong className="text-dark">Growth:</strong> Features
                    evolve based on how you actually achieve your goals.
                  </div>
                </li>
              </ul>
            </div>

            {/* Placeholder Image/Visual */}
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="300"
                viewBox="0 0 24 24"
                fill="none"
                stroke={accentColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-compass-doodle"
              >
                {/* Stylized Compass/Guidance Icon */}
                <circle cx="12" cy="12" r="10" opacity="0.4"></circle>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="18" y1="6" x2="16" y2="8"></line>
                <line x1="22" y1="12" x2="18" y2="12"></line>
                <line x1="18" y1="18" x2="16" y2="16"></line>
              </svg>
            </div>
          </div>

          {/* Strong CTA at the bottom */}
          <div
            className="text-center mt-5 p-4 rounded-3 shadow-sm"
            style={{ backgroundColor: "#e6fffa" }}
          >
            <h4 className="fw-bold" style={{ color: accentColor }}>
              Ready to find your focus?
            </h4>
            <p className="text-muted">
              Join the thousands who are already organizing their path to
              success.
            </p>
            <a
              href="#signup"
              className="btn btn-lg rounded-pill text-white fw-bold px-5 mt-2"
              style={{ backgroundColor: accentColor, borderColor: accentColor }}
            >
              Start Organizing for Free
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

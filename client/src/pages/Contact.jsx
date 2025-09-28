import React, { useState } from "react";

const Contact = () => {
  const accentColor = "#319795";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simple handler for form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simple handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // In a real application, you would send this data to a backend API here.
    setIsSubmitted(true);
    // Optional: Clear form data after submission
    // setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container py-5" id="contact">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <header className="text-center mb-5">
            <h1 className="display-5 fw-bolder" style={{ color: accentColor }}>
              Get In Touch
            </h1>
            <p className="lead text-muted mt-3">
              We're here to help you solve problems and achieve flow state. Send
              us a message, and we'll respond within 24 hours.
            </p>
          </header>

          <div className="row g-5">
            {/* Contact Form Column */}
            <div className="col-lg-7">
              <div className="card p-4 shadow-lg rounded-4">
                <div className="card-body">
                  {isSubmitted ? (
                    <div className="text-center py-5">
                      <h4 className="fw-bold" style={{ color: accentColor }}>
                        Thank You!
                      </h4>
                      <p className="text-muted">
                        Your message has been received. We appreciate you
                        reaching out and will be in touch shortly.
                      </p>
                      <button
                        className="btn mt-3 rounded-pill text-white fw-bold px-4"
                        style={{ backgroundColor: accentColor }}
                        onClick={() => setIsSubmitted(false)}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {/* Name and Email Row */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label
                            htmlFor="name"
                            className="form-label text-muted"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Jane Doe"
                            required
                          />
                        </div>
                        <div className="col-md-6 mt-3 mt-md-0">
                          <label
                            htmlFor="email"
                            className="form-label text-muted"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="hello@example.com"
                            required
                          />
                        </div>
                      </div>

                      {/* Subject Field */}
                      <div className="mb-3">
                        <label
                          htmlFor="subject"
                          className="form-label text-muted"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="I need help with task lists..."
                          required
                        />
                      </div>

                      {/* Message Textarea */}
                      <div className="mb-4">
                        <label
                          htmlFor="message"
                          className="form-label text-muted"
                        >
                          Your Message
                        </label>
                        <textarea
                          className="form-control"
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="4"
                          placeholder="How can we help you today?"
                          required
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="btn w-100 rounded-pill text-white fw-bold py-2"
                        style={{
                          backgroundColor: accentColor,
                          borderColor: accentColor,
                        }}
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Details Column */}
            <div className="col-lg-5">
              <div
                className="p-4 rounded-4"
                style={{ backgroundColor: "#e6fffa" }}
              >
                <h4 className="fw-bold mb-4" style={{ color: accentColor }}>
                  Direct Support Channels
                </h4>

                {/* Email Address */}
                <div className="d-flex mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="me-3 mt-1"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <div>
                    <h6 className="mb-1 fw-bold text-dark">
                      General Inquiries
                    </h6>
                    <a
                      href="mailto:support@organizer.app"
                      className="text-decoration-none"
                      style={{ color: accentColor }}
                    >
                      support@organizer.app
                    </a>
                  </div>
                </div>

                {/* Sales/Partnerships */}
                <div className="d-flex mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="me-3 mt-1"
                  >
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                    <path d="M18 10v6"></path>
                    <path d="M18 10v6"></path>
                    <path d="M10 21H3v-7"></path>
                  </svg>
                  <div>
                    <h6 className="mb-1 fw-bold text-dark">
                      Partnerships & Sales
                    </h6>
                    <a
                      href="mailto:sales@organizer.app"
                      className="text-decoration-none"
                      style={{ color: accentColor }}
                    >
                      sales@organizer.app
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="d-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="me-3 mt-1"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <div>
                    <h6 className="mb-1 fw-bold text-dark">Support Hours</h6>
                    <p className="text-muted mb-0">
                      Monday - Friday, 9:00 AM to 5:00 PM EST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

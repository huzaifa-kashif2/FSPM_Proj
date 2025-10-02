import React from "react";
import { Link } from "react-router-dom";

const DashboardSidebar = ({ isOpen }) => {
  const sidebarStyle = {
    backgroundColor: "#319795",
    minHeight: "100vh",
    transition: "all 0.3s",
    width: "250px",
    position: "fixed",
    left: isOpen ? "0" : "-250px",
    top: "60px", // Changed from 0 to header height
    zIndex: 1000,
    height: "calc(100vh - 60px)", // Adjust height to account for header
  };

  return (
    <div
      style={sidebarStyle}
      className="d-flex flex-column flex-shrink-0 p-3 text-white"
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <Link to="/dash" className="nav-link text-white">
            <i className="bi bi-house-door me-2"></i>
            Home
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/analytics" className="nav-link text-white">
            <i className="bi bi-graph-up me-2"></i>
            Manage Tasks
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/projects" className="nav-link text-white">
            <i className="bi bi-kanban me-2"></i>
            Manage Notes
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/calendar" className="nav-link text-white">
            <i className="bi bi-calendar3 me-2"></i>
            View Deadlines
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/calendar" className="nav-link text-white">
            <i className="bi bi-calendar3 me-2"></i>
            AI Plagiarism Checker
          </Link>
        </li>

        <hr className="my-3 bg-white opacity-25" />

        <li className="nav-item mb-2">
          <Link to="/settings" className="nav-link text-white">
            <i className="bi bi-gear me-2"></i>
            Settings
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/profile" className="nav-link text-white">
            <i className="bi bi-person me-2"></i>
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebar;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  StickyNote,
  BookCheck,
  Settings,
  UserCircle,
} from "lucide-react";

const DashboardSidebar = ({ isOpen }) => {
  const location = useLocation();
  const sidebarStyle = {
    backgroundColor: "#319795",
    minHeight: "100vh",
    transition: "transform 0.3s ease-in-out",
    width: window.innerWidth < 992 ? "80%" : "250px",
    maxWidth: "300px",
    position: "fixed",
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    top: "60px",
    zIndex: 1000,
    height: "calc(100vh - 60px)",
    boxShadow: isOpen ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
    overflowY: "auto",
    overflowX: "hidden",
  };

  const getNavLinkClass = (path) => {
    return `nav-link text-white d-flex align-items-center ${
      location.pathname === path ? "active" : ""
    }`;
  };

  const navLinkStyle = {
    transition: "background-color 0.2s ease",
    borderRadius: "6px",
    padding: "0.75rem 1rem",
  };

  return (
    <div
      style={sidebarStyle}
      className="d-flex flex-column flex-shrink-0 p-3 text-white"
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <Link
            to="/dashboard"
            className={getNavLinkClass("/dashboard")}
            style={navLinkStyle}
          >
            <LayoutDashboard size={18} className="me-2" />
            Home
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/dashboard/tasks"
            className={getNavLinkClass("/dashboard/tasks")}
          >
            <ListTodo size={18} className="me-2" />
            Manage Tasks
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/dashboard/notes"
            className={getNavLinkClass("/dashboard/notes")}
          >
            <StickyNote size={18} className="me-2" />
            Manage Notes
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/dashboard/ai-check"
            className={getNavLinkClass("/dashboard/ai-check")}
            style={navLinkStyle}
          >
            <BookCheck size={18} className="me-2" />
            AI Plagiarism Checker
          </Link>
        </li>

        <hr className="my-3 bg-white opacity-25" />

        <li className="nav-item mb-2">
          <Link
            to="/dashboard/settings"
            className={getNavLinkClass("/dashboard/settings")}
          >
            <Settings size={18} className="me-2" />
            Settings
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/dashboard/profile"
            className={getNavLinkClass("/dashboard/profile")}
          >
            <UserCircle size={18} className="me-2" />
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebar;

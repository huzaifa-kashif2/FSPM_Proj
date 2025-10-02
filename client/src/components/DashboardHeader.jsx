import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  Calendar,
  BookOpen,
  Settings,
  Zap,
  User, // For the avatar icon
} from "lucide-react";

const DashboardHeader = () => {
  const accentColor = "#319795"; // Teal accent color
  return (
    // Main Header Container: Full-width top bar
    <header
      className="d-flex flex-row justify-content-between align-items-center py-2 px-4 bg-white shadow-sm border-b border-gray-200 position-fixed w-100"
      style={{ zIndex: 1100, height: "60px" }}
    >
      <div className="left-side d-flex align-items-center gap-2">
        <div className="logo">Logo</div>
        <div className="text">
          <h1 style={{ color: accentColor }}>Organizer</h1>
        </div>
      </div>
      <div className="right-side d-flex align-items-center gap-4">
        <div className="notifications position-relative">
          <i className="bi bi-bell-fill fs-5" style={{ color: "#666" }}></i>
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
            <span className="visually-hidden">New notifications</span>
          </span>
        </div>
        <div className="profile d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-secondary"
            style={{
              width: "35px",
              height: "35px",
              backgroundColor: "#319795",
            }}
          >
            <i className="bi bi-person-fill text-white"></i>
          </div>
          <span className="text-dark">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

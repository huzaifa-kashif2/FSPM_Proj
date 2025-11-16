import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHome from "../components/DashboardHome";
import DashboardTasks from "../components/DashboardTasks";
import DashboardNotes from "../components/DashboardNotes";
import Settings from "../components/Settings";
import Profile from "../components/Profile";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user } = useAuth();

  console.log("Current user in Dashboard:", user);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-light">
      <DashboardHeader toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />
      {/* Backdrop for mobile */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark d-lg-none"
        style={{
          opacity: sidebarOpen ? 0.5 : 0,
          visibility: sidebarOpen ? "visible" : "hidden",
          transition: "opacity 0.3s, visibility 0.3s",
          zIndex: 999,
        }}
        onClick={toggleSidebar}
      />
      <div className="d-flex">
        <DashboardSidebar isOpen={sidebarOpen} />
        <main
          className="flex-grow-1"
          style={{
            marginLeft:
              window.innerWidth >= 992 ? (sidebarOpen ? "250px" : "0") : "0",
            marginTop: "60px",
            minHeight: "calc(100vh - 60px)",
            transition: "margin-left 0.3s",
            padding: "1.5rem",
            width: "100%",
          }}
        >
          {location.pathname === "/dashboard" && <DashboardHome user={user} />}
          {location.pathname === "/dashboard/tasks" && (
            <DashboardTasks user={user} />
          )}
          {location.pathname === "/dashboard/notes" && <DashboardNotes />}
          {location.pathname === "/dashboard/settings" && <Settings />}
          {location.pathname === "/dashboard/profile" && <Profile />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

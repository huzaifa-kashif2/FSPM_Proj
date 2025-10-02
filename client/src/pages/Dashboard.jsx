import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHome from "../components/DashboardHome";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-light">
      <DashboardHeader />
      <div className="d-flex">
        <DashboardSidebar isOpen={sidebarOpen} />
        <main
          className="flex-grow-1"
          style={{
            marginLeft: sidebarOpen ? "250px" : "0",
            marginTop: "60px",
            minHeight: "calc(100vh - 60px)",
            transition: "margin-left 0.3s",
            padding: "1.5rem",
          }}
        >
          <DashboardHome />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import { BarChart, Calendar, CheckSquare, Clock } from "lucide-react";

const DashboardHome = () => {
  const accentColor = "#319795";

  // Placeholder data
  const recentTasks = [
    {
      id: 1,
      title: "Complete Project Proposal",
      deadline: "Today, 5:00 PM",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Review Documentation",
      deadline: "Tomorrow, 3:00 PM",
      status: "Pending",
    },
    {
      id: 3,
      title: "Team Meeting",
      deadline: "Oct 5, 11:00 AM",
      status: "Upcoming",
    },
  ];

  const stats = [
    { title: "Total Tasks", value: "24", icon: CheckSquare, color: "#319795" },
    { title: "Due Today", value: "5", icon: Clock, color: "#E53E3E" },
    { title: "Completed", value: "18", icon: BarChart, color: "#38A169" },
    { title: "Upcoming", value: "8", icon: Calendar, color: "#D69E2E" },
  ];

  return (
    <div className="p-4">
      {/* Welcome Section */}
      <div className="mb-4">
        <h1 className="h3 mb-2">Welcome back, John!</h1>
        <p className="text-muted">
          Here's what's happening with your tasks today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">{stat.title}</h6>
                    <h2 className="mb-0" style={{ color: stat.color }}>
                      {stat.value}
                    </h2>
                  </div>
                  <div
                    className="rounded-circle p-3"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon size={24} color={stat.color} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="row g-4">
        {/* Recent Tasks */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">Recent Tasks</h5>
                <button
                  className="btn btn-sm"
                  style={{ backgroundColor: accentColor, color: "white" }}
                >
                  View All
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Task</th>
                      <th scope="col">Deadline</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.deadline}</td>
                        <td>
                          <span
                            className={`badge ${
                              task.status === "In Progress"
                                ? "bg-warning"
                                : task.status === "Pending"
                                ? "bg-danger"
                                : "bg-info"
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Quick Actions</h5>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary d-flex align-items-center gap-2 justify-content-center">
                  <i className="bi bi-plus-circle"></i>
                  New Task
                </button>
                <button className="btn btn-outline-success d-flex align-items-center gap-2 justify-content-center">
                  <i className="bi bi-journal-plus"></i>
                  Add Note
                </button>
                <button className="btn btn-outline-info d-flex align-items-center gap-2 justify-content-center">
                  <i className="bi bi-calendar-plus"></i>
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Upcoming Deadlines</h5>
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <div>
                    <h6 className="mb-0">Project Review</h6>
                    <small className="text-muted">Today, 2:00 PM</small>
                  </div>
                  <span className="badge bg-danger">Due</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <div>
                    <h6 className="mb-0">Team Meeting</h6>
                    <small className="text-muted">Tomorrow, 10:00 AM</small>
                  </div>
                  <span className="badge bg-warning">Tomorrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

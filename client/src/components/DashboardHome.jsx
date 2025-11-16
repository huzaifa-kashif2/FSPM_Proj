import React from "react";
import { useEffect, useState } from "react";
import { BarChart, Calendar, CheckSquare, Clock } from "lucide-react";
import { tasksApi } from "../api/tasksApi";
import AddTaskModal from "./AddTaskModal";

const DashboardHome = ({ user }) => {
  const accentColor = "#319795";
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await tasksApi.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    // Fetch tasks on mount
    fetchTasks();
  }, []);

  // Placeholder data
  const formatDate = (dateStr) => {
    return new Date(dateStr).toDateString();
  };
  const recentTasks = tasks
    .filter((task) => formatDate(task.createdAt) === new Date().toDateString())
    .map((task) => ({
      id: task._id,
      title: task.title,
      deadline: formatDate(task.dueDate),
      status: task.status.charAt(0).toUpperCase() + task.status.slice(1),
    }));

  const tasksDueToday = tasks.filter((task) => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return (
      dueDate.getDate() === today.getDate() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getFullYear() === today.getFullYear()
    );
  }).length;

  const tasksCompleted = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const tasksUpcoming = tasks.filter((task) => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate > today;
  }).length;

  const tasksUrgent = tasks.filter((task) => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const timeDiff = dueDate - today;
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 3 && task.status !== "completed";
  });

  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: CheckSquare,
      color: "#319795",
    },
    { title: "Due Today", value: tasksDueToday, icon: Clock, color: "#E53E3E" },
    {
      title: "Completed",
      value: tasksCompleted,
      icon: BarChart,
      color: "#38A169",
    },
    {
      title: "Upcoming",
      value: tasksUpcoming,
      icon: Calendar,
      color: "#D69E2E",
    },
  ];

  const [showAddTask, setShowAddTask] = useState(false);
  const addTask = () => {
    setShowAddTask(true);
  };

  return (
    <>
      <div className="p-4">
        {/* Welcome Section */}
        <div className="mb-4">
          <h1 className="h3 mb-2">Welcome back, {user?.fullName}!</h1>
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
                                task.status === "In-progress"
                                  ? "bg-warning"
                                  : task.status === "Pending"
                                  ? "bg-danger"
                                  : "bg-success"
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
                  <button
                    className="btn btn-outline-primary d-flex align-items-center gap-2 justify-content-center"
                    onClick={addTask}
                  >
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
                {/* <div className="list-group list-group-flush">
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
              </div> */}
                {tasksUrgent.length === 0 ? (
                  <p className="text-muted">No upcoming urgent tasks.</p>
                ) : (
                  <div className="list-group list-group-flush">
                    {tasksUrgent.map((task) => (
                      <div
                        key={task.id}
                        className="list-group-item d-flex justify-content-between align-items-center px-0"
                      >
                        <div>
                          <h6 className="mb-0">{task.title}</h6>
                          <small className="text-muted">
                            {formatDate(task.dueDate)}
                          </small>
                        </div>
                        <span className="badge bg-danger">
                          {formatDate(task.dueDate) === formatDate(new Date())
                            ? "Due Today"
                            : formatDate(task.dueDate) ===
                              formatDate(
                                new Date().setDate(new Date().getDate() + 1)
                              )
                            ? "Due Tomorrow"
                            : formatDate(task.dueDate) ===
                              formatDate(
                                new Date().setDate(new Date().getDate() + 2)
                              )
                            ? "Due day after tomorrow"
                            : "Due Soon"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddTask && (
        <AddTaskModal
          open={showAddTask}
          onClose={() => setShowAddTask(false)}
          onCreated={() => {
            setShowAddTask(false);
            fetchTasks();
          }}
          userId={user?.id || user?._id}
        />
      )}
    </>
  );
};

export default DashboardHome;

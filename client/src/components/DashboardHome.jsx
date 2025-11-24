import React, { useEffect, useState } from "react";
import { BarChart, Calendar, CheckSquare, Clock } from "lucide-react";
import { tasksApi } from "../api/tasksApi";
import AddTaskModal from "./AddTaskModal";

const DashboardHome = ({ user }) => {
  // const accentColor = "#319795";
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  const fetchTasks = async () => {
    try {
      const uid = user?.id || user?._id;
      if (!uid) return;
      const response = await tasksApi.getTasksByUser(uid);
      setTasks(response.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const formatDate = (dateStr) => new Date(dateStr).toDateString();

  // Recent tasks (created today) with overdue highlight
  const recentTasks = tasks
    .filter((task) => formatDate(task.createdAt) === new Date().toDateString())
    .map((task) => ({
      id: task._id,
      title: task.title,
      deadline: formatDate(task.dueDate),
      status: task.status.charAt(0).toUpperCase() + task.status.slice(1),
      dueDate: task.dueDate,
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

  const isOverdue = (dueDateStr) => {
    if (!dueDateStr) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dueDateStr);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  // Upcoming soon: due today, tomorrow, day after tomorrow
  const upcomingSoon = tasks.filter((task) => {
    if (!task.dueDate || task.status === "completed") return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    const diffDays = Math.round((dueDate - today) / (1000 * 3600 * 24));
    return diffDays >= 0 && diffDays <= 2;
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

  return (
    <>
      <div className="p-4">
        <div className="mb-4">
          <h1 className="h3 mb-2">Welcome back, {user?.fullName}!</h1>
          <p className="text-muted">
            Here's what's happening with your tasks today.
          </p>
        </div>
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
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="card-title mb-0">Recent Tasks</h5>
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
                      {recentTasks.map((task) => {
                        const overdue =
                          isOverdue(task.dueDate) &&
                          task.status.toLowerCase() !== "completed";
                        return (
                          <tr
                            key={task.id}
                            className={overdue ? "table-danger" : ""}
                          >
                            <td>{task.title}</td>
                            <td>
                              <span
                                className={
                                  overdue
                                    ? "text-danger fw-semibold"
                                    : "text-muted"
                                }
                              >
                                {task.deadline}
                              </span>
                            </td>
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
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Upcoming Deadlines</h5>
                {upcomingSoon.length === 0 ? (
                  <p className="text-muted">No tasks due in the next 3 days.</p>
                ) : (
                  <div className="list-group list-group-flush">
                    {upcomingSoon.map((task) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const dueDate = new Date(task.dueDate);
                      dueDate.setHours(0, 0, 0, 0);
                      const diffDays = Math.round(
                        (dueDate - today) / (1000 * 3600 * 24)
                      );
                      const label =
                        diffDays === 0
                          ? "Due Today"
                          : diffDays === 1
                          ? "Due Tomorrow"
                          : "Due Day After Tomorrow";
                      return (
                        <div
                          key={task._id}
                          className="list-group-item d-flex justify-content-between align-items-center px-0"
                        >
                          <div>
                            <h6 className="mb-0">{task.title}</h6>
                            <small className="text-muted">
                              {formatDate(task.dueDate)}
                            </small>
                          </div>
                          <span className="badge bg-danger">{label}</span>
                        </div>
                      );
                    })}
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

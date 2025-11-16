import React, { useState } from "react";
import {
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Clock,
  Edit,
  Trash2,
} from "lucide-react";

const DashboardTasks = () => {
  const accentColor = "#319795";

  // Sample tasks data - replace with your actual data/API calls
  const [tasks] = useState([
    {
      id: 1,
      title: "Complete Project Proposal",
      description: "Write and submit the project proposal document",
      status: "pending",
      priority: "high",
      dueDate: "2025-10-05",
    },
    {
      id: 2,
      title: "Review Documentation",
      description: "Review and update project documentation",
      status: "in-progress",
      priority: "medium",
      dueDate: "2025-10-03",
    },
    {
      id: 3,
      title: "Team Meeting",
      description: "Weekly team sync meeting",
      status: "completed",
      priority: "low",
      dueDate: "2025-10-02",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tasks based on status and search query
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 size={18} className="text-success" />;
      case "in-progress":
        return <Clock size={18} className="text-warning" />;
      default:
        return <Circle size={18} className="text-secondary" />;
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  const handleEdit = (task) => {
    // TODO: replace with edit modal/navigation
    console.log("Edit task", task);
  };

  const handleDelete = (taskId) => {
    // TODO: replace with real delete logic
    console.log("Delete task", taskId);
  };

  return (
    <div className="container-fluid px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Task Management</h2>
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          style={{ backgroundColor: accentColor, borderColor: accentColor }}
        >
          <PlusCircle size={20} />
          Add New Task
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <Search size={18} className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <Filter size={18} className="text-muted" />
            </span>
            <select
              className="form-select border-start-0"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-4">Task</th>
                      <th>Priority</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr key={task.id}>
                        <td className="px-4">
                          <div className="d-flex align-items-center gap-2">
                            {getStatusIcon(task.status)}
                            <div>
                              <h6 className="mb-0">{task.title}</h6>
                              <small className="text-muted">
                                {task.description}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge bg-${getPriorityBadgeColor(
                              task.priority
                            )}`}
                          >
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}
                          </span>
                        </td>
                        <td>
                          <span className="text-muted">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge bg-${
                              task.status === "completed"
                                ? "success"
                                : task.status === "in-progress"
                                ? "warning"
                                : "secondary"
                            }`}
                          >
                            {task.status
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              type="button"
                              className="btn btn-link p-0"
                              title="Edit"
                              aria-label={`Edit ${task.title}`}
                              onClick={() => handleEdit(task)}
                            >
                              <Edit size={18} className="text-primary" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-link p-0"
                              title="Delete"
                              aria-label={`Delete ${task.title}`}
                              onClick={() => handleDelete(task.id)}
                            >
                              <Trash2 size={18} className="text-danger" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTasks;

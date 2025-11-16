import React, { useState } from "react";
import { tasksApi } from "../api/tasksApi";

const AddTaskModal = ({ open, onClose, onCreated, userId: propUserId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState(""); // yyyy-mm-dd
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !title.trim() ||
      !description.trim() ||
      !status.trim() ||
      !priority.trim() ||
      !dueDate.trim()
    ) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const storedUser = (() => {
        try {
          return JSON.parse(localStorage.getItem("authUser") || "null");
        } catch {
          return null;
        }
      })();
      const userId = propUserId || storedUser?.id || storedUser?._id;
      if (!userId) {
        setError("No logged-in user found.");
        setSubmitting(false);
        return;
      }

      const payload = {
        title: title.trim(),
        description: description.trim(),
        status: status.trim(),
        priority: priority.trim(),
        dueDate: dueDate.trim(),
        userId,
      };

      const { data } = await tasksApi.createTask(payload);
      if (onCreated) onCreated(data?.task);
      // reset and close
      setTitle("");
      setDescription("");
      setStatus("pending");
      setPriority("medium");
      setDueDate("");
      onClose?.();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create task.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (submitting) return;
    onClose?.();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="card shadow p-3"
        style={{ width: "100%", maxWidth: 520, borderRadius: "0.75rem" }}
      >
        <div className="card-body">
          <h5 className="fw-bold mb-3">Add New Task</h5>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                required
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="d-flex gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancel}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn text-white"
                style={{ backgroundColor: "#319795", borderColor: "#319795" }}
                disabled={submitting}
              >
                {submitting ? "Adding..." : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;

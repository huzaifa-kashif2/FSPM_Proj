import React, { useState } from "react";
import { notesApi } from "../api/notesApi";

const AddNoteModal = ({ open, onClose, onCreated, userId: propUserId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const parseTags = (raw) =>
    raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tags = parseTags(tagsInput);
    if (!title.trim() || !content.trim() || tags.length === 0) {
      setError("Title, content and at least one tag are required.");
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

      const { data } = await notesApi.createNote({
        title: title.trim(),
        content: content.trim(),
        tags,
        userId,
      });

      onCreated?.(data);
      // reset and close
      setTitle("");
      setContent("");
      setTagsInput("");
      onClose?.();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create note.");
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
          <h5 className="fw-bold mb-3">Add New Note</h5>
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
                placeholder="Enter note title"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                className="form-control"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tags</label>
              <input
                type="text"
                className="form-control"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. work, important, meeting"
                required
              />
              <small className="text-muted">Comma-separated list</small>
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
                {submitting ? "Adding..." : "Add Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;

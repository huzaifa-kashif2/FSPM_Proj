import React, { useEffect, useState } from "react";
import { notesApi } from "../api/notesApi";

const EditNoteModal = ({ open, note, onClose, onUpdated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open && note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      const tags = Array.isArray(note.tags) ? note.tags : [];
      setTagsInput(tags.join(", "));
      setError("");
      setSubmitting(false);
    }
  }, [open, note]);

  if (!open || !note) return null;

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
      const id = note._id || note.id;
      const { data } = await notesApi.updateNote(id, {
        title: title.trim(),
        content: content.trim(),
        tags,
      });
      onUpdated?.(data);
      onClose?.();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update note.");
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
          <h5 className="fw-bold mb-3">Edit Note</h5>
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
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;

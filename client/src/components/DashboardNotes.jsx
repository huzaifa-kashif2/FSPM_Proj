import React, { useState } from "react";
import {
  PlusCircle,
  Search,
  Grid,
  LayoutList,
  Bookmark,
  Tag,
  MoreVertical,
  Edit3,
  Trash2,
} from "lucide-react";

const DashboardNotes = () => {
  const accentColor = "#319795";
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  // Sample notes data - replace with your actual data/API calls
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Project Requirements",
      content: "Key requirements for the new project phase...",
      tags: ["work", "important"],
      color: "#FEF3C7",
      date: "2025-10-02",
    },
    {
      id: 2,
      title: "Meeting Notes",
      content: "Discussion points from today's team meeting...",
      tags: ["work", "meeting"],
      color: "#DBEAFE",
      date: "2025-10-02",
    },
    {
      id: 3,
      title: "Research Topics",
      content: "Key areas to research for the upcoming presentation...",
      tags: ["research", "important"],
      color: "#F3E8FF",
      date: "2025-10-01",
    },
  ]);

  // All unique tags from notes
  const allTags = ["all", ...new Set(notes.flatMap((note) => note.tags))];

  // Filter notes based on search and tags
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "all" || note.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="container-fluid px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Notes</h2>
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          style={{ backgroundColor: accentColor, borderColor: accentColor }}
        >
          <PlusCircle size={20} />
          Add New Note
        </button>
      </div>

      {/* Search and View Options */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <Search size={18} className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-end gap-2">
          <button
            className={`btn ${
              viewMode === "grid" ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <Grid size={18} />
          </button>
          <button
            className={`btn ${
              viewMode === "list" ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setViewMode("list")}
          >
            <LayoutList size={18} />
          </button>
        </div>
      </div>

      {/* Tags Filter */}
      <div className="mb-4 d-flex gap-2 flex-wrap">
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`btn ${
              selectedTag === tag ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag === "all" ? (
              <Bookmark size={16} className="me-1" />
            ) : (
              <Tag size={16} className="me-1" />
            )}
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>
        ))}
      </div>

      {/* Notes Grid/List View */}
      <div
        className={viewMode === "grid" ? "row g-4" : "d-flex flex-column gap-3"}
      >
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={viewMode === "grid" ? "col-md-4 col-lg-3" : "w-100"}
          >
            <div
              className="card border-0 h-100"
              style={{ backgroundColor: note.color }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title mb-0">{note.title}</h5>
                  <div className="dropdown">
                    <button
                      className="btn btn-link text-dark p-0"
                      data-bs-toggle="dropdown"
                    >
                      <MoreVertical size={18} />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="dropdown-item d-flex align-items-center">
                          <Edit3 size={16} className="me-2" />
                          Edit Note
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item d-flex align-items-center text-danger">
                          <Trash2 size={16} className="me-2" />
                          Delete Note
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="card-text text-muted">
                  {viewMode === "grid"
                    ? truncateText(note.content, 100)
                    : note.content}
                </p>
                <div className="d-flex flex-wrap gap-2 mt-3">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge bg-white text-dark"
                      style={{ opacity: 0.8 }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <small className="text-muted d-block mt-3">
                  {new Date(note.date).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardNotes;

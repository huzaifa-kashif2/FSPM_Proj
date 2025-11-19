import React, { useState } from "react";
import { User, Mail, Edit2, Camera, CheckCircle, BookOpen } from "lucide-react";

const Profile = () => {
  const accentColor = "#319795";

  // Sample user data - replace with actual user data from your backend
  const [user, setUser] = useState(() => {
    // Attempt to pull from localStorage authUser to stay consistent
    try {
      const stored = JSON.parse(localStorage.getItem("authUser") || "null");
      return {
        name: stored?.fullName || stored?.name || "User",
        email: stored?.email || "user@example.com",
        avatar: null,
        bio: "Manage your tasks and notes efficiently.",
      };
    } catch {
      return {
        name: "User",
        email: "user@example.com",
        avatar: null,
        bio: "Manage your tasks and notes efficiently.",
      };
    }
  });

  // Sample statistics
  const statistics = [
    {
      title: "Tasks Completed",
      value: "--",
      icon: CheckCircle,
      color: "#319795",
    },
    { title: "Notes Created", value: "--", icon: BookOpen, color: "#3182CE" },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container-fluid px-4">
      <div className="row g-4">
        {/* Profile Header */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-auto">
                  <div className="position-relative">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center bg-light"
                      style={{
                        width: "120px",
                        height: "120px",
                        overflow: "hidden",
                      }}
                    >
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt="Profile"
                          className="w-100 h-100 object-fit-cover"
                        />
                      ) : (
                        <User size={48} className="text-muted" />
                      )}
                    </div>
                    <label
                      className="position-absolute bottom-0 end-0 btn btn-sm btn-light rounded-circle shadow-sm"
                      style={{ cursor: "pointer" }}
                    >
                      <Camera size={16} />
                      <input
                        type="file"
                        className="d-none"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h2 className="mb-0">{user.name}</h2>
                    <button
                      className="btn btn-primary d-flex align-items-center gap-2"
                      style={{
                        backgroundColor: accentColor,
                        borderColor: accentColor,
                      }}
                    >
                      <Edit2 size={18} />
                      Edit Profile
                    </button>
                  </div>
                  <p className="text-muted mb-0">{user.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Productivity Stats */}
        <div className="col-12">
          <div className="row g-4">
            {statistics.map((stat, index) => (
              <div key={index} className="col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle p-3 me-3"
                        style={{ backgroundColor: `${stat.color}20` }}
                      >
                        <stat.icon size={24} color={stat.color} />
                      </div>
                      <div>
                        <h3 className="h4 mb-0">{stat.value}</h3>
                        <p className="text-muted small mb-0">{stat.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Account Info */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-4">Account</h4>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user.name}
                      onChange={(e) =>
                        setUser((p) => ({ ...p, name: e.target.value }))
                      }
                      disabled
                    />
                    <small className="text-muted">
                      (Editable implementation pending)
                    </small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label d-flex align-items-center">
                      <Mail size={16} className="me-2" /> Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={user.email}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Change Password (placeholder)
                  </label>
                  <div className="row g-2 mb-2">
                    <div className="col-12 col-lg-4">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Current"
                        disabled
                      />
                    </div>
                    <div className="col-12 col-lg-4">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="New"
                        disabled
                      />
                    </div>
                    <div className="col-12 col-lg-4">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm"
                        disabled
                      />
                    </div>
                  </div>
                  <small className="text-muted">
                    Password update flow will be added later.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

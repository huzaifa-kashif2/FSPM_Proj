import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Edit2,
  Camera,
  CheckCircle,
  BookOpen,
  Save,
  X,
} from "lucide-react";
import { authApi } from "../api/authApi";
import { tasksApi } from "../api/tasksApi";
import { notesApi } from "../api/notesApi";

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
      };
    } catch {
      return {
        name: "User",
        email: "user@example.com",
        avatar: null,
      };
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: user.name,
    email: user.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Sample statistics
  const [statistics, setStatistics] = useState([
    {
      title: "Tasks Completed",
      value: "...",
      icon: CheckCircle,
      color: "#319795",
    },
    { title: "Notes Created", value: "...", icon: BookOpen, color: "#3182CE" },
  ]);

  // Fetch task and note counts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
        const userId = authUser.id;

        if (!userId) {
          console.error("User ID not found");
          return;
        }

        const [tasksResponse, notesResponse] = await Promise.all([
          tasksApi.getTasksByUser(userId),
          notesApi.getNotesByUser(userId),
        ]);

        console.log("Fetched tasks:", tasksResponse);

        const completedTasks = tasksResponse.data.filter(
          (task) => task.status === "completed"
        ).length;

        console.log("Completed tasks:", completedTasks);

        setStatistics([
          {
            title: "Tasks Completed",
            value: completedTasks,
            icon: CheckCircle,
            color: "#319795",
          },
          {
            title: "Notes Created",
            value: notesResponse.data.length,
            icon: BookOpen,
            color: "#3182CE",
          },
        ]);
      } catch (err) {
        console.error("Failed to fetch statistics:", err);
      }
    };

    fetchStats();
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setEditForm({
        fullName: user.name,
        email: user.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setError("");
      setSuccess("");
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    setError("");
    setSuccess("");

    // Validate passwords if changing
    if (
      editForm.newPassword ||
      editForm.currentPassword ||
      editForm.confirmPassword
    ) {
      if (!editForm.currentPassword) {
        setError("Current password is required to change password");
        return;
      }
      if (!editForm.newPassword) {
        setError("New password is required");
        return;
      }
      if (editForm.newPassword !== editForm.confirmPassword) {
        setError("New passwords do not match");
        return;
      }
      if (editForm.newPassword.length < 6) {
        setError("New password must be at least 6 characters");
        return;
      }
    }

    setLoading(true);
    try {
      const updateData = {
        fullName: editForm.fullName,
        email: editForm.email,
      };

      if (editForm.currentPassword && editForm.newPassword) {
        updateData.currentPassword = editForm.currentPassword;
        updateData.newPassword = editForm.newPassword;
      }

      const response = await authApi.updateProfile(updateData);

      // Update local state and localStorage
      setUser({
        ...user,
        name: response.data.user.fullName,
        email: response.data.user.email,
      });

      const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
      authUser.fullName = response.data.user.fullName;
      authUser.email = response.data.user.email;
      localStorage.setItem("authUser", JSON.stringify(authUser));

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setEditForm({
        fullName: response.data.user.fullName,
        email: response.data.user.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

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
                      onClick={handleEditToggle}
                    >
                      {isEditing ? (
                        <>
                          <X size={18} />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit2 size={18} />
                          Edit Profile
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-muted mb-0">{user.email}</p>
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
              <h4 className="card-title mb-4">Account Information</h4>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={isEditing ? editForm.fullName : user.name}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, fullName: e.target.value }))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label d-flex align-items-center">
                      <Mail size={16} className="me-2" /> Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={isEditing ? editForm.email : user.email}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, email: e.target.value }))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Change Password</label>
                  <div className="mb-2">
                    <input
                      type="password"
                      className="form-control mb-2"
                      placeholder="Current Password"
                      value={editForm.currentPassword}
                      onChange={(e) =>
                        setEditForm((p) => ({
                          ...p,
                          currentPassword: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="password"
                      className="form-control mb-2"
                      placeholder="New Password"
                      value={editForm.newPassword}
                      onChange={(e) =>
                        setEditForm((p) => ({
                          ...p,
                          newPassword: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm New Password"
                      value={editForm.confirmPassword}
                      onChange={(e) =>
                        setEditForm((p) => ({
                          ...p,
                          confirmPassword: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  {!isEditing && (
                    <small className="text-muted">
                      Click Edit Profile to change your password
                    </small>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="mt-4">
                  <button
                    className="btn btn-primary d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: accentColor,
                      borderColor: accentColor,
                    }}
                    onClick={handleSaveProfile}
                    disabled={loading}
                  >
                    <Save size={18} />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

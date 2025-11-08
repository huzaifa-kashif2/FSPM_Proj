import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Edit2,
  Camera,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
} from "lucide-react";

const Profile = () => {
  const accentColor = "#319795";

  // Sample user data - replace with actual user data from your backend
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
    department: "Computer Science",
    joinDate: "2025-08-15",
    avatar: null, // URL for profile picture
    bio: "Senior Computer Science student passionate about software development and AI.",
  });

  // Sample statistics
  const statistics = [
    {
      title: "Tasks Completed",
      value: "124",
      icon: CheckCircle,
      color: "#319795",
    },
    { title: "Notes Created", value: "45", icon: BookOpen, color: "#3182CE" },
    { title: "Study Hours", value: "256", icon: Clock, color: "#DD6B20" },
    { title: "Achievements", value: "12", icon: Award, color: "#D69E2E" },
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

        {/* Statistics */}
        <div className="col-12">
          <div className="row g-4">
            {statistics.map((stat, index) => (
              <div key={index} className="col-md-6 col-lg-3">
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
                        <h3 className="h2 mb-0">{stat.value}</h3>
                        <p className="text-muted small mb-0">{stat.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Information */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-4">Personal Information</h4>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="mb-4">
                    <div className="d-flex align-items-center text-muted mb-2">
                      <Mail size={18} className="me-2" />
                      <span className="small">Email Address</span>
                    </div>
                    <div className="fw-medium">{user.email}</div>
                  </div>
                  <div className="mb-4">
                    <div className="d-flex align-items-center text-muted mb-2">
                      <Phone size={18} className="me-2" />
                      <span className="small">Phone Number</span>
                    </div>
                    <div className="fw-medium">{user.phone}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-4">
                    <div className="d-flex align-items-center text-muted mb-2">
                      <MapPin size={18} className="me-2" />
                      <span className="small">Location</span>
                    </div>
                    <div className="fw-medium">{user.location}</div>
                  </div>
                  <div className="mb-4">
                    <div className="d-flex align-items-center text-muted mb-2">
                      <Briefcase size={18} className="me-2" />
                      <span className="small">Department</span>
                    </div>
                    <div className="fw-medium">{user.department}</div>
                  </div>
                  <div className="mb-4">
                    <div className="d-flex align-items-center text-muted mb-2">
                      <Calendar size={18} className="me-2" />
                      <span className="small">Joined</span>
                    </div>
                    <div className="fw-medium">
                      {new Date(user.joinDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
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

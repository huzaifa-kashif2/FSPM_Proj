import React, { useState } from "react";
import {
  Bell,
  Moon,
  Sun,
  Globe,
  Shield,
  Mail,
  Smartphone,
  User,
  Lock,
  Save,
} from "lucide-react";

const Settings = () => {
  const accentColor = "#319795";

  // Sample settings state
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    reminderTime: "1hour",

    // Appearance
    theme: "light",
    language: "english",

    // Privacy
    profileVisibility: "public",
    showEmail: false,
    twoFactorAuth: false,
  });

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="container-fluid px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Settings</h2>
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          style={{ backgroundColor: accentColor, borderColor: accentColor }}
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>

      <div className="row g-4">
        {/* Notifications Settings */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <Bell
                  size={24}
                  className="text-primary me-2"
                  style={{ color: accentColor }}
                />
                <h4 className="card-title mb-0">Notifications</h4>
              </div>

              <div className="mb-4">
                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      handleSettingChange(
                        "emailNotifications",
                        e.target.checked
                      )
                    }
                  />
                  <label
                    className="form-check-label d-flex align-items-center"
                    htmlFor="emailNotifications"
                  >
                    <Mail size={18} className="me-2" />
                    Email Notifications
                  </label>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onChange={(e) =>
                      handleSettingChange("pushNotifications", e.target.checked)
                    }
                  />
                  <label
                    className="form-check-label d-flex align-items-center"
                    htmlFor="pushNotifications"
                  >
                    <Smartphone size={18} className="me-2" />
                    Push Notifications
                  </label>
                </div>

                <div className="mb-3">
                  <label className="form-label">Reminder Time</label>
                  <select
                    className="form-select"
                    value={settings.reminderTime}
                    onChange={(e) =>
                      handleSettingChange("reminderTime", e.target.value)
                    }
                  >
                    <option value="30min">30 minutes before</option>
                    <option value="1hour">1 hour before</option>
                    <option value="1day">1 day before</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <Sun
                  size={24}
                  className="text-primary me-2"
                  style={{ color: accentColor }}
                />
                <h4 className="card-title mb-0">Appearance</h4>
              </div>

              <div className="mb-4">
                <label className="form-label">Theme</label>
                <div className="d-flex gap-2">
                  <button
                    className={`btn ${
                      settings.theme === "light"
                        ? "btn-dark"
                        : "btn-outline-dark"
                    }`}
                    onClick={() => handleSettingChange("theme", "light")}
                  >
                    <Sun size={18} className="me-2" />
                    Light
                  </button>
                  <button
                    className={`btn ${
                      settings.theme === "dark"
                        ? "btn-dark"
                        : "btn-outline-dark"
                    }`}
                    onClick={() => handleSettingChange("theme", "dark")}
                  >
                    <Moon size={18} className="me-2" />
                    Dark
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label d-flex align-items-center">
                  <Globe size={18} className="me-2" />
                  Language
                </label>
                <select
                  className="form-select"
                  value={settings.language}
                  onChange={(e) =>
                    handleSettingChange("language", e.target.value)
                  }
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <Shield
                  size={24}
                  className="text-primary me-2"
                  style={{ color: accentColor }}
                />
                <h4 className="card-title mb-0">Privacy & Security</h4>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label d-flex align-items-center">
                      <User size={18} className="me-2" />
                      Profile Visibility
                    </label>
                    <select
                      className="form-select"
                      value={settings.profileVisibility}
                      onChange={(e) =>
                        handleSettingChange("profileVisibility", e.target.value)
                      }
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>

                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="showEmail"
                      checked={settings.showEmail}
                      onChange={(e) =>
                        handleSettingChange("showEmail", e.target.checked)
                      }
                    />
                    <label
                      className="form-check-label d-flex align-items-center"
                      htmlFor="showEmail"
                    >
                      <Mail size={18} className="me-2" />
                      Show email on profile
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="twoFactorAuth"
                      checked={settings.twoFactorAuth}
                      onChange={(e) =>
                        handleSettingChange("twoFactorAuth", e.target.checked)
                      }
                    />
                    <label
                      className="form-check-label d-flex align-items-center"
                      htmlFor="twoFactorAuth"
                    >
                      <Lock size={18} className="me-2" />
                      Two-factor authentication
                    </label>
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

export default Settings;

import React, { useState } from "react";
import { Moon, Sun, Globe, Lock, Save, Sliders } from "lucide-react";

const Settings = () => {
  const accentColor = "#319795";

  // Sample settings state
  const [settings, setSettings] = useState({
    // Appearance
    theme: "light",
    language: "english",

    // Task preferences
    defaultTaskFilter: "all",
    showOverdueFirst: true,
    compactTaskRows: false,

    // Security
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
        {/* Appearance */}
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

        {/* Task Preferences */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <Sliders
                  size={24}
                  className="me-2"
                  style={{ color: accentColor }}
                />
                <h4 className="card-title mb-0">Task Preferences</h4>
              </div>
              <div className="mb-3">
                <label className="form-label">Default Task Filter</label>
                <select
                  className="form-select"
                  value={settings.defaultTaskFilter}
                  onChange={(e) =>
                    handleSettingChange("defaultTaskFilter", e.target.value)
                  }
                >
                  <option value="all">All Tasks</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showOverdueFirst"
                  checked={settings.showOverdueFirst}
                  onChange={(e) =>
                    handleSettingChange("showOverdueFirst", e.target.checked)
                  }
                />
                <label className="form-check-label" htmlFor="showOverdueFirst">
                  Show overdue tasks first
                </label>
              </div>
              <div className="form-check form-switch mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="compactTaskRows"
                  checked={settings.compactTaskRows}
                  onChange={(e) =>
                    handleSettingChange("compactTaskRows", e.target.checked)
                  }
                />
                <label className="form-check-label" htmlFor="compactTaskRows">
                  Use compact task rows
                </label>
              </div>
              <p className="text-muted small mb-0">
                (These preferences will shape task list rendering.)
              </p>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <Lock
                  size={24}
                  className="me-2"
                  style={{ color: accentColor }}
                />
                <h4 className="card-title mb-0">Security</h4>
              </div>
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
                <label className="form-check-label" htmlFor="twoFactorAuth">
                  Enable two-factor authentication
                </label>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Change Password (placeholder)
                </label>
                <div className="row g-2">
                  <div className="col-md-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Current"
                      disabled
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New"
                      disabled
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm"
                      disabled
                    />
                  </div>
                </div>
                <small className="text-muted">
                  (Will be implemented later)
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

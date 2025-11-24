import React, { useState, useEffect } from "react";
import { Moon, Sun, Lock, Save, Sliders } from "lucide-react";
import { authApi } from "../api/authApi";

const Settings = () => {
  const accentColor = "#319795";

  // Sample settings state
  const [settings, setSettings] = useState({
    // Appearance
    theme: "light",

    // Task preferences
    defaultTaskFilter: "all",
    showOverdueFirst: true,
    compactTaskRows: false,

    // Security
    twoFactorAuth: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch MFA settings on component mount
  useEffect(() => {
    const fetchMfaSettings = async () => {
      try {
        const response = await authApi.getMfaSettings();
        setSettings((prev) => ({
          ...prev,
          twoFactorAuth: response.data.mfaEnabled,
        }));
      } catch (err) {
        console.error("Failed to fetch MFA settings:", err);
      }
    };

    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem("taskPreferences");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings((prev) => ({
          ...prev,
          defaultTaskFilter: parsed.defaultTaskFilter || "all",
          showOverdueFirst:
            parsed.showOverdueFirst !== undefined
              ? parsed.showOverdueFirst
              : true,
        }));
      } catch (err) {
        console.error("Failed to parse saved settings:", err);
      }
    }

    fetchMfaSettings();
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    setMessage("");
    setError("");
    setLoading(true);

    try {
      // Save MFA settings
      await authApi.updateMfaSettings({
        mfaEnabled: settings.twoFactorAuth,
      });

      // Save task preferences to localStorage
      const taskPreferences = {
        defaultTaskFilter: settings.defaultTaskFilter,
        showOverdueFirst: settings.showOverdueFirst,
      };
      localStorage.setItem("taskPreferences", JSON.stringify(taskPreferences));

      setMessage("Settings saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save settings");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Apply theme to document root (light/dark)
  React.useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === "dark") {
      root.classList.add("theme-dark");
    } else {
      root.classList.remove("theme-dark");
    }
  }, [settings.theme]);

  return (
    <div className="container-fluid px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Settings</h2>
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          style={{ backgroundColor: accentColor, borderColor: accentColor }}
          onClick={handleSaveSettings}
          disabled={loading}
        >
          <Save size={20} />
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row g-4">
        {/* Task Preferences */}
        <div className="col-12">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

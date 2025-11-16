import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const DashboardHeader = ({ toggleSidebar, isOpen }) => {
  const navigate = useNavigate();
  const accentColor = "#319795"; // Teal accent color
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      // Call server logout (optional; server may clear cookies/audit)
      await authApi.logout();
    } catch (e) {
      // proceed even if request fails
      console.error("Logout error:", e);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      navigate("/signin", { replace: true });
    }
  };
  return (
    // Main Header Container: Full-width top bar
    <header
      className="d-flex flex-row justify-content-between align-items-center py-2 px-4 bg-white shadow-sm border-b border-gray-200 position-fixed w-100"
      style={{ zIndex: 1100, height: "60px" }}
    >
      <div className="left-side d-flex align-items-center gap-3">
        <button
          className="btn btn-link text-dark p-0 d-flex align-items-center"
          onClick={toggleSidebar}
          style={{
            marginRight: "0.5rem",
            position: "relative",
            width: "24px",
            height: "24px",
          }}
        >
          <div
            style={{
              position: "absolute",
              transition: "opacity 0.3s, transform 0.3s",
              opacity: isOpen ? 0 : 1,
              transform: isOpen ? "rotate(180deg)" : "rotate(0)",
            }}
          >
            <Menu size={24} />
          </div>
          <div
            style={{
              position: "absolute",
              transition: "opacity 0.3s, transform 0.3s",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "rotate(0)" : "rotate(-180deg)",
            }}
          >
            <X size={24} />
          </div>
        </button>
        <div className="logo d-flex align-items-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z"
              fill="#319795"
            />
            <path
              d="M22.667 11.333l-8.334 8.334-4-4"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="text d-flex align-items-center">
          <h1
            className="mb-0 fw-bold"
            style={{ color: accentColor, fontSize: "1.5rem" }}
          >
            Organizer
          </h1>
        </div>
      </div>
      <div className="right-side d-flex align-items-center gap-4">
        <div className="dropdown" ref={dropdownRef}>
          <button
            id="userMenuButton"
            className="btn d-flex align-items-center gap-2 p-0 border-0 bg-transparent"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            style={{ boxShadow: "none" }}
          >
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: "35px",
                height: "35px",
                backgroundColor: "#319795",
              }}
            >
              <i className="bi bi-person-fill text-white"></i>
            </div>
            <span className="text-dark">{user?.fullName}</span>
            <i
              className={`bi ms-1 ${
                isDropdownOpen ? "bi-caret-up-fill" : "bi-caret-down-fill"
              }`}
              style={{ color: "#666" }}
            ></i>
          </button>
          <div
            className={`dropdown-menu dropdown-menu-end mt-2 ${
              isDropdownOpen ? "show" : ""
            }`}
            aria-labelledby="userMenuButton"
            style={{ minWidth: "160px" }}
          >
            <button
              className="dropdown-item text-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

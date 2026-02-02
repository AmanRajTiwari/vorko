import React, { useState, useRef, useEffect } from "react";
import { Settings, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "../../lib/auth";
import { useNavigate } from "react-router-dom";

/**
 * ProfileDropdown Component - Shows logged-in student name and provides logout option
 */
export function ProfileDropdown() {
  const context = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut();
      setIsOpen(false);
      navigate("/login");
    } catch (err) {
      console.error("[ProfileDropdown] Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!context.isAuthenticated || !context.profile) {
    return null;
  }

  const initials = (context.profile.name || "S")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div ref={dropdownRef} className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Profile menu"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-purple rounded-full flex items-center justify-center text-white font-bold">
          {context.profile.avatar_url ? (
            <img
              src={context.profile.avatar_url}
              alt={context.profile.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        {/* Name (hidden on small screens) */}
        <div className="hidden lg:flex flex-col items-start">
          <p className="text-sm font-semibold text-white">
            {context.profile.name || "Student"}
          </p>
          <p className="text-xs text-gray-400">Student</p>
        </div>

        {/* Chevron Icon */}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="fixed right-4 top-20 z-[9999] w-64 bg-dark-lighter border border-white/10 rounded-xl shadow-xl">
          {/* Profile Info */}
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-sm font-semibold text-white">
              {context.profile.name || "Student"}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {context.profile.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/student/settings");
              }}
              className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/5 transition-colors flex items-center gap-3"
            >
              <Settings size={18} className="text-gray-400" />
              <span>Settings</span>
            </button>
          </div>

          {/* Logout Button */}
          <div className="border-t border-white/10 p-2">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-3"
            >
              <LogOut size={18} />
              <span>{isLoading ? "Logging out..." : "Logout"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

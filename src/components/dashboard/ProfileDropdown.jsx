import React, { useState, useRef, useEffect } from "react";
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
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Profile menu"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
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
        <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
          {context.profile.name || "Student"}
        </span>

        {/* Chevron Icon */}
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
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
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-[100]">
          {/* Profile Info */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {context.profile.name || "Student"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {context.profile.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/dashboard/profile");
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              📋 My Profile
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/dashboard/settings");
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              ⚙️ Settings
            </button>
          </div>

          {/* Logout Button */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-2">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? "🔄 Logging out..." : "🚪 Logout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

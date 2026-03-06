import React, { useContext, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  MessageCircle,
  Search,
  X,
  Menu,
  ChevronRight,
} from "lucide-react";
import { StudentDataContext } from "../../context/StudentContext";
import { ProfileDropdown } from "./ProfileDropdown";

export default function StudentTopBar({ isCollapsed, mobileSidebarOpen, setMobileSidebarOpen }) {
  const { activeProject, notifications, markNotificationAsRead } =
    useContext(StudentDataContext);

  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const notifRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close notifications on outside click
  useEffect(() => {
    const handle = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [showNotifications]);

  return (
    <header
      className="w-full flex items-center justify-between gap-4"
      style={{
        height: 56,
        background: "rgba(10,14,39,0.90)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "0 20px",
      }}
    >
      {/* ── Left: Hamburger (mobile) + Project info ── */}
      <div className="flex items-center gap-3 min-w-0 flex-1">

        {/* Hamburger (mobile only) */}
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="md:hidden flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/8 transition-all duration-150 flex-shrink-0"
          style={{ width: 34, height: 34 }}
        >
          <Menu size={18} />
        </button>

        {/* Breadcrumb / project context */}
        <div className="hidden sm:flex items-center gap-2 min-w-0">
          <span className="text-gray-500 text-xs font-medium flex-shrink-0">Student</span>
          <ChevronRight size={12} className="text-gray-600 flex-shrink-0" />
          <span
            className="text-sm font-semibold text-white truncate"
            style={{ maxWidth: 220 }}
          >
            {activeProject?.name || "No active project"}
          </span>
        </div>

        {/* Mobile: just show project name */}
        <div className="flex sm:hidden items-center min-w-0">
          <span className="text-sm font-semibold text-white truncate">
            {activeProject?.name || "Dashboard"}
          </span>
        </div>
      </div>

      {/* ── Center: Search bar (hidden on mobile) ── */}
      <div className="hidden md:flex items-center flex-shrink-0">
        <div
          className="flex items-center gap-2 rounded-xl transition-all duration-200"
          style={{
            background: searchFocused ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
            border: searchFocused
              ? "1px solid rgba(0,217,255,0.35)"
              : "1px solid rgba(255,255,255,0.08)",
            width: searchFocused ? 260 : 200,
            transition: "width 0.25s ease, border-color 0.2s, background 0.2s",
            padding: "0 12px",
            height: 34,
          }}
        >
          <Search size={14} className="text-gray-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent border-none outline-none text-sm text-gray-300 placeholder-gray-600 flex-1 min-w-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-gray-500 hover:text-gray-300 flex-shrink-0"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* ── Right: Notifications, Messages, Profile ── */}
      <div className="flex items-center gap-1 flex-shrink-0">

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/8 transition-all duration-150"
            style={{ width: 34, height: 34 }}
          >
            <Bell size={17} />
            {unreadCount > 0 && (
              <span
                className="absolute top-0.5 right-0.5 flex items-center justify-center rounded-full text-[9px] font-bold text-dark"
                style={{
                  width: 16, height: 16,
                  background: "linear-gradient(135deg,#00d9ff,#a78bfa)",
                  boxShadow: "0 0 8px rgba(0,217,255,0.5)",
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications panel */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-10 z-[60] rounded-2xl overflow-hidden"
                style={{
                  width: 320,
                  background: "rgba(13,17,40,0.98)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(0,217,255,0.15)", color: "#00d9ff" }}
                    >
                      {unreadCount} new
                    </span>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 text-sm">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationAsRead(notif.id)}
                        className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-white/4"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{
                            background: notif.read ? "transparent" : "#00d9ff",
                            boxShadow: notif.read ? "none" : "0 0 6px #00d9ff",
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-semibold ${notif.read ? "text-gray-400" : "text-white"}`}>
                            {notif.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                          <p className="text-[10px] text-gray-600 mt-1">
                            {new Date(notif.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Messages (desktop only) */}
        <button
          className="hidden md:flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/8 transition-all duration-150"
          style={{ width: 34, height: 34 }}
        >
          <MessageCircle size={17} />
        </button>

        {/* Divider (desktop only) */}
        <div
          className="hidden md:block mx-1 flex-shrink-0"
          style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)" }}
        />

        {/* Profile dropdown */}
        <div className="relative">
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}

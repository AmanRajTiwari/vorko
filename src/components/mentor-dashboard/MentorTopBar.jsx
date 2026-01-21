import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  User,
  ChevronDown,
  LogOut,
  ArrowLeft,
} from "lucide-react";

export default function MentorTopBar({ onMenuClick, sidebarOpen, pageTitle }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleNavigateSettings = () => {
    navigate("/mentor/settings");
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    // Clear session and redirect
    navigate("/");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <motion.header
      className="sticky top-0 z-30 bg-dark/80 backdrop-blur-md border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left: Navigation */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={handleBackToHome}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 hover:text-accent" />
          </motion.button>

          <motion.button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5" />
          </motion.button>

          {/* Page Title */}
          <div className="hidden md:block">
            <p className="text-sm text-gray-400">Mentor Dashboard</p>
          </div>

          {/* Global Search */}
          <motion.div
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus-within:border-accent/50 transition-colors ml-auto"
            whileHover={{ scale: 1.02 }}
          >
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, students..."
              className="bg-transparent outline-none text-sm text-white placeholder-gray-500 w-64"
            />
          </motion.div>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <motion.div
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            {showNotifications && (
              <motion.div
                className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 top-20 sm:top-auto sm:mt-2 max-w-sm bg-dark border border-white/10 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="p-4 space-y-3">
                  <h3 className="text-sm font-semibold mb-4 sticky top-0 bg-dark">
                    Notifications
                  </h3>

                  {/* Notification items */}
                  {[
                    {
                      title: "Project Review Pending",
                      desc: "AI Chatbot - waiting for your feedback",
                      time: "2 hours ago",
                    },
                    {
                      title: "Meeting Reminder",
                      desc: "Team discussion in 30 minutes",
                      time: "30 mins",
                    },
                    {
                      title: "Milestone Approved",
                      desc: "Database Design checkpoint completed",
                      time: "4 hours ago",
                    },
                  ].map((notif, idx) => (
                    <motion.div
                      key={idx}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                      whileHover={{ x: 4 }}
                    >
                      <p className="text-sm font-medium text-white">
                        {notif.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{notif.desc}</p>
                      <p className="text-xs text-gray-500 mt-2">{notif.time}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Profile Menu */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent rounded-lg flex items-center justify-center text-sm font-bold">
                DS
              </div>
              <span className="hidden sm:inline text-sm font-medium">You</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </motion.button>

            {showProfileMenu && (
              <motion.div
                className="absolute right-0 mt-2 w-48 bg-dark border border-white/10 rounded-lg shadow-lg p-2 space-y-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm font-semibold">Dr. Sharma</p>
                  <p className="text-xs text-gray-400">Computer Science</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 rounded transition-colors">
                  Profile
                </button>
                <button
                  onClick={handleNavigateSettings}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 rounded transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 rounded transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

import React, { useContext, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  MessageCircle,
  User,
  LogOut,
  Settings,
  ChevronDown,
  X,
  Menu,
} from "lucide-react";
import { StudentDataContext } from "../../context/StudentContext";
import { useAuth } from "../../contexts/AuthContext";
import { ProfileDropdown } from "./ProfileDropdown";
import { useNavigate } from "react-router-dom";

export default function StudentTopBar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const context = useAuth();
  const { activeProject, notifications, markNotificationAsRead } =
    useContext(StudentDataContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close notifications on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  return (
    <div className="w-full h-16 lg:h-20 bg-dark border-b border-white/10 flex items-center justify-between px-4 lg:px-8 gap-4 overflow-x-hidden">
      {/* Left - Hamburger + Project Info */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Hamburger Menu - Mobile */}
        <motion.button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu size={24} />
        </motion.button>

        {/* Project Info - Hide on mobile, show on tablet+ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hidden sm:flex items-center gap-4 min-w-0 flex-1"
        >
          <div className="min-w-0">
            <p className="text-xs text-gray-400">Current Project</p>
            <p className="text-sm lg:text-lg font-bold text-white truncate">
              {activeProject?.name}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2 lg:gap-6">
        {/* Notifications - Icon only on mobile */}
        <div className="relative" ref={notificationsRef}>
          <motion.button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-white/10 rounded-lg transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} className="text-gray-400 group-hover:text-white" />
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-dark"
              >
                {unreadCount}
              </motion.div>
            )}
          </motion.button>

          {/* Notifications Panel - Responsive width */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="fixed right-20 top-20 w-full sm:w-80 bg-dark-lighter border border-white/10 rounded-xl shadow-xl z-[60] max-h-96 overflow-y-auto mx-2 sm:mx-0"
              >
                <div className="p-4 border-b border-white/10">
                  <h3 className="font-bold">Notifications</h3>
                </div>

                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/10">
                    {notifications.map((notif) => (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => markNotificationAsRead(notif.id)}
                        className={`p-4 cursor-pointer hover:bg-white/5 transition-colors ${
                          !notif.read ? "bg-white/5" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-semibold text-sm">
                              {notif.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notif.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(notif.date).toLocaleDateString()}
                            </p>
                          </div>
                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full bg-accent mt-1 flex-shrink-0" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Messages - Hidden on mobile */}
        <motion.button
          className="hidden lg:flex p-2 hover:bg-white/10 rounded-lg transition-colors group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle
            size={20}
            className="text-gray-400 group-hover:text-white"
          />
        </motion.button>

        {/* Divider - Hidden on mobile */}
        <div className="hidden lg:block w-px h-6 bg-white/10" />

        {/* Profile Menu */}
        <div className="relative">
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Search, Bell, User, ChevronDown, ArrowLeft } from "lucide-react";

export default function TopBar({ onMenuClick, sidebarOpen, onBack }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <motion.header
      className="sticky top-0 z-30 bg-dark/80 backdrop-blur-md border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left: Menu + Project Switcher */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-accent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Back to landing page"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5" />
          </motion.button>

          {/* Project Switcher */}
          <motion.div
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-accent/50 transition-colors cursor-pointer group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-purple rounded-md flex items-center justify-center text-xs font-bold">
              CS
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">AI Chatbot</p>
              <p className="text-xs text-gray-400">Major Project</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors" />
          </motion.div>
        </div>

        {/* Right: Search + Notifications + Profile */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <motion.div
            className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus-within:border-accent/50 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks, people..."
              className="bg-transparent outline-none text-sm text-white placeholder-gray-500 w-48"
            />
          </motion.div>

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
                className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"
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
                <div className="p-4 space-y-2">
                  <p className="text-sm font-semibold mb-4 sticky top-0 bg-dark">
                    Notifications
                  </p>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <p className="text-sm font-medium">
                        Team submitted tasks
                      </p>
                      <p className="text-xs text-gray-400">2 min ago</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <p className="text-sm font-medium">
                        Mentor feedback ready
                      </p>
                      <p className="text-xs text-gray-400">15 min ago</p>
                    </div>
                  </div>
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
              <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-blue rounded-lg flex items-center justify-center text-sm font-bold">
                PK
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
                  <p className="text-sm font-semibold">Priyanshi Kapse</p>
                  <p className="text-xs text-gray-400">Team Lead</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 rounded transition-colors">
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 rounded transition-colors">
                  Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 rounded transition-colors">
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

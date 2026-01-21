import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  Calendar,
  FileText,
  Zap,
  Settings,
  ChevronLeft,
  Menu,
} from "lucide-react";

export default function Sidebar({ isOpen, onToggle }) {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "My Projects", icon: FolderOpen },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "meetings", label: "Meetings", icon: Calendar },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "viva", label: "Viva Mode", icon: Zap },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: -300,
      opacity: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden md:flex w-64 bg-gradient-to-b from-dark/50 to-dark/30 border-r border-white/10 flex-col"
        initial={{ x: 0 }}
        animate={{ x: 0 }}
      >
        {/* Logo */}
        <motion.div
          className="p-6 border-b border-white/10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-purple rounded-lg flex items-center justify-center font-bold">
              V
            </div>
            <div>
              <p className="font-bold text-lg">Vorko</p>
              <p className="text-xs text-gray-400">Student Workspace</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative group ${
                  isActive
                    ? "text-accent"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarHighlight"
                    className="absolute inset-0 bg-accent/10 rounded-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10" />
                <span className="text-sm font-medium relative z-10">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </nav>

        {/* Settings */}
        <motion.div
          className="p-4 border-t border-white/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </motion.div>
      </motion.aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 md:hidden z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onToggle}
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <motion.aside
            className="absolute left-0 top-0 w-64 h-full bg-dark border-r border-white/10 flex flex-col"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo */}
            <motion.div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-purple rounded-lg flex items-center justify-center font-bold">
                  V
                </div>
                <p className="font-bold">Vorko</p>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveItem(item.id);
                      onToggle();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-accent/20 text-accent"
                        : "text-gray-400 hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </motion.aside>
        </motion.div>
      )}
    </>
  );
}

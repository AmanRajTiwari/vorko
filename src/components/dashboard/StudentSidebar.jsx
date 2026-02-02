import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  Users,
  Calendar,
  FileText,
  Zap,
  Settings,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

export default function StudentSidebar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (onClose) {
      onClose();
    }
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/student/dashboard",
    },
    {
      label: "Projects",
      icon: FolderOpen,
      path: "/student/projects",
    },
    {
      label: "Tasks",
      icon: CheckSquare,
      path: "/student/tasks",
    },
    {
      label: "Team",
      icon: Users,
      path: "/student/team",
    },
    {
      label: "Meetings",
      icon: Calendar,
      path: "/student/meetings",
    },
    {
      label: "Reports",
      icon: FileText,
      path: "/student/reports",
    },
    {
      label: "Viva Mode",
      icon: Zap,
      path: "/student/viva-mode",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/student/settings",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 64 : 256 }}
      transition={{ duration: 0.3 }}
      className="relative bg-dark border-r border-white/10 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-dark font-bold">
              V
            </div>
            <span className="font-bold text-lg">Vorko</span>
          </motion.div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <motion.button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                active
                  ? "bg-gradient-to-r from-accent/20 to-accent-purple/20 text-accent"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Active indicator */}
              {active && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-accent-purple rounded-r-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <Icon size={20} className="flex-shrink-0" />

              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 text-left font-medium"
                >
                  {item.label}
                </motion.span>
              )}

              {active && !isCollapsed && (
                <div className="w-2 h-2 rounded-full bg-accent ml-auto" />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <motion.button
          onClick={() => {
            navigate("/");
            if (onClose) onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft size={20} />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm font-medium"
            >
              Back to Home
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

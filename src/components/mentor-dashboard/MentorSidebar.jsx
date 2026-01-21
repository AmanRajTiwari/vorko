import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  FolderOpen,
  MessageSquare,
  Calendar,
  FileText,
  Award,
  Settings,
  X,
  LogOut,
} from "lucide-react";

export default function MentorSidebar({ isOpen, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", path: "/mentor/dashboard" },
    { icon: FolderOpen, label: "Assigned Projects", path: "/mentor/projects" },
    {
      icon: MessageSquare,
      label: "Reviews & Feedback",
      path: "/mentor/reviews",
    },
    { icon: Calendar, label: "Meetings", path: "/mentor/meetings" },
    { icon: FileText, label: "Reports", path: "/mentor/reports" },
    { icon: Award, label: "Viva Readiness", path: "/mentor/viva-readiness" },
    { icon: Settings, label: "Settings", path: "/mentor/settings" },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onToggle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className="fixed md:relative w-64 h-screen bg-dark/95 border-r border-white/10 backdrop-blur-md z-40 md:z-0 flex flex-col"
        variants={sidebarVariants}
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-purple rounded-lg flex items-center justify-center">
              <span className="font-bold text-sm">V</span>
            </div>
            <span className="font-bold hidden sm:inline">Vorko</span>
          </motion.div>

          {/* Close button on mobile */}
          <motion.button
            onClick={onToggle}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={idx}
                onClick={() => {
                  navigate(item.path);
                  onToggle(); // Close sidebar on mobile after navigation
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-accent/20 to-accent-purple/20 text-accent border-l-2 border-accent"
                    : "text-gray-300 hover:bg-white/5"
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Footer - Mentor Info */}
        <div className="p-4 border-t border-white/10">
          <motion.div
            className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-xs text-gray-400">Mentor</p>
            <p className="text-sm font-semibold">Dr. Sharma</p>
            <p className="text-xs text-gray-400">Computer Science</p>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}

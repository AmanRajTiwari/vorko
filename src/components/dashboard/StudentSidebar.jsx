import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { motion } from "framer-motion";

const menuItems = [
  { label: "Dashboard",  icon: LayoutDashboard, path: "/student/dashboard" },
  { label: "Projects",   icon: FolderOpen,      path: "/student/projects" },
  { label: "Tasks",      icon: CheckSquare,     path: "/student/tasks" },
  { label: "Team",       icon: Users,           path: "/student/team" },
  { label: "Meetings",   icon: Calendar,        path: "/student/meetings" },
  { label: "Reports",    icon: FileText,        path: "/student/reports" },
  { label: "Viva Mode",  icon: Zap,             path: "/student/viva-mode" },
  { label: "Settings",   icon: Settings,        path: "/student/settings" },
];

export default function StudentSidebar({ isCollapsed, setIsCollapsed, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col h-full select-none">

      {/* ── Header ── */}
      <div
        className="flex items-center border-b border-white/7"
        style={{
          height: 56,
          padding: isCollapsed ? "0 12px" : "0 16px",
          justifyContent: isCollapsed ? "center" : "space-between",
          transition: "padding 0.3s",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => handleNav("/")}
          className="flex items-center gap-3 overflow-hidden cursor-pointer"
          style={{
            opacity: isCollapsed ? 0 : 1,
            width: isCollapsed ? 0 : "auto",
            transition: "opacity 0.2s, width 0.3s",
            pointerEvents: isCollapsed ? "none" : "auto",
            whiteSpace: "nowrap",
          }}
        >
          {/* Glassmorphic "V" tile (from Navbar) */}
          <div
            className="relative flex-shrink-0 group"
            style={{ width: 32, height: 32 }}
          >
            {/* Frosted glass body */}
            <div
              className="absolute inset-0 rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(16px) saturate(180%)",
                WebkitBackdropFilter: "blur(16px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.1), 0 4px 24px rgba(0,217,255,0.1)",
              }}
            >
              {/* Top gloss streak */}
              <div
                className="absolute top-0 left-0 right-0 h-[45%] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.03) 100%)",
                  borderRadius: "12px 12px 0 0",
                }}
              />
              {/* Subtle cyan tint bloom */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 60% 30%, rgba(0,217,255,0.09) 0%, transparent 70%)",
                }}
              />
            </div>

            {/* V letter */}
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105" style={{ zIndex: 2 }}>
              <span
                className="font-black"
                style={{
                  fontSize: "0.9rem",
                  letterSpacing: "-0.04em",
                  color: "rgba(255,255,255,0.95)",
                  textShadow: "0 0 12px rgba(0,217,255,0.6)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                V
              </span>
            </div>
          </div>

          {/* Premium chrome wordmark (from Navbar) */}
          <motion.span
            className="font-black tracking-tight"
            style={{
              fontSize: "1.1rem",
              letterSpacing: "-0.04em",
              background: "linear-gradient(135deg, #e8e8e8 0%, #ffffff 20%, #c0c0c0 40%, #f5f5f5 55%, #a8a8a8 70%, #ffffff 85%, #d4d4d4 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
            }}
            animate={{ backgroundPosition: ["0% center", "200% center"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            Vorko
          </motion.span>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/8 transition-all duration-150 flex-shrink-0"
          style={{ width: 30, height: 30 }}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3" style={{ padding: "12px 8px" }}>

        {/* Section label */}
        {!isCollapsed && (
          <p
            className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2"
            style={{ padding: "0 8px", transition: "opacity 0.2s" }}
          >
            Menu
          </p>
        )}

        <div className="space-y-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <div key={item.path} className="group relative">
                <button
                  onClick={() => handleNav(item.path)}
                  className={`relative w-full flex items-center rounded-lg transition-all duration-150 overflow-hidden ${
                    active
                      ? "bg-gradient-to-r from-cyan-500/15 to-violet-500/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/6"
                  }`}
                  style={{
                    height: 40,
                    padding: isCollapsed ? "0" : "0 10px",
                    justifyContent: isCollapsed ? "center" : "flex-start",
                    gap: isCollapsed ? 0 : 10,
                  }}
                >
                  {/* Active left border */}
                  {active && (
                    <span
                      className="absolute left-0 top-2 bottom-2 rounded-r-full"
                      style={{ width: 3, background: "linear-gradient(180deg,#00d9ff,#a78bfa)" }}
                    />
                  )}

                  {/* Icon */}
                  <span
                    className={`flex-shrink-0 transition-all duration-150 ${
                      active ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300"
                    }`}
                    style={{ marginLeft: active && !isCollapsed ? 6 : 0 }}
                  >
                    <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
                  </span>

                  {/* Label */}
                  {!isCollapsed && (
                    <span
                      className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-200 ${
                        active ? "text-white" : ""
                      }`}
                      style={{ opacity: isCollapsed ? 0 : 1 }}
                    >
                      {item.label}
                    </span>
                  )}

                  {/* Active dot */}
                  {active && !isCollapsed && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "#00d9ff", boxShadow: "0 0 6px #00d9ff" }}
                    />
                  )}
                </button>

                {/* Tooltip (collapsed only) */}
                {isCollapsed && (
                  <div
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-3 pointer-events-none z-50
                               px-2.5 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap
                               opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    style={{
                      background: "rgba(13,17,40,0.97)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {item.label}
                    {/* Arrow */}
                    <span
                      className="absolute right-full top-1/2 -translate-y-1/2"
                      style={{
                        width: 0, height: 0,
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                        borderRight: "5px solid rgba(255,255,255,0.12)",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* ── Footer ── */}
      <div
        className="border-t border-white/7"
        style={{ padding: "10px 8px" }}
      >
        <div className="group relative">
          <button
            onClick={() => { navigate("/"); if (onClose) onClose(); }}
            className="w-full flex items-center rounded-lg text-gray-500 hover:text-white hover:bg-white/6 transition-all duration-150"
            style={{
              height: 40,
              padding: isCollapsed ? "0" : "0 10px",
              justifyContent: isCollapsed ? "center" : "flex-start",
              gap: isCollapsed ? 0 : 10,
            }}
          >
            <ArrowLeft size={17} strokeWidth={1.8} className="flex-shrink-0" />
            {!isCollapsed && (
              <span className="text-sm font-medium whitespace-nowrap">
                Back to Home
              </span>
            )}
          </button>

          {/* Tooltip for footer item */}
          {isCollapsed && (
            <div
              className="absolute left-full top-1/2 -translate-y-1/2 ml-3 pointer-events-none z-50
                         px-2.5 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap
                         opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{
                background: "rgba(13,17,40,0.97)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              Back to Home
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

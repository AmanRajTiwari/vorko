import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import StudentSidebar from "./StudentSidebar";
import StudentTopBar from "./StudentTopBar";
import { StudentDataContext } from "../../context/StudentContext";

/**
 * StudentLayout - Mobile-first dashboard layout
 *
 * Structure:
 * - Mobile: Hamburger menu + header, full-width content
 * - Desktop: Sidebar (320px) + header, content offset by sidebar
 *
 * Key principles:
 * - Sidebar HIDDEN on mobile, FIXED on desktop
 * - Main content ALWAYS full-width available
 * - No flex layout conflicts
 */
export default function StudentLayout({ children }) {
  const { activeProject } = useContext(StudentDataContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-screen h-screen bg-dark text-white overflow-hidden flex flex-col lg:flex-row">
      {/* ===== MOBILE OVERLAY ===== */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ===== DESKTOP SIDEBAR (lg+ only) ===== */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:flex-shrink-0 lg:bg-dark lg:border-r lg:border-white/10 lg:z-20">
        <StudentSidebar />
      </div>

      {/* ===== MOBILE SIDEBAR DRAWER ===== */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed left-0 top-0 h-screen w-80 z-40 bg-dark lg:hidden overflow-y-auto"
          >
            <StudentSidebar onClose={() => setSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 w-full">
        {/* Top Navigation Bar */}
        <StudentTopBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-dark-lighter w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

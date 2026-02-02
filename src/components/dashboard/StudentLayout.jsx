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
    <div className="min-h-screen flex">
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

      {/* ===== DESKTOP SIDEBAR (md+ only) ===== */}
      <div className="hidden md:flex md:w-64 md:flex-col md:flex-shrink-0 md:bg-dark md:border-r md:border-white/10 md:fixed md:left-0 md:top-0 md:h-screen md:z-40 md:overflow-hidden">
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
            className="fixed left-0 top-0 h-screen w-80 z-40 bg-dark lg:hidden overflow-hidden"
          >
            <StudentSidebar onClose={() => setSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="flex-1 ml-0 md:ml-64 flex flex-col">
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-50">
          <StudentTopBar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Main Content (window scroll) */}
        <main className="flex-1 bg-dark-lighter pt-6 px-6">{children}</main>
      </div>
    </div>
  );
}

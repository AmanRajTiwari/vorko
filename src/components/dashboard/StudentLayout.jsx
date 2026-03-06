import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StudentSidebar from "./StudentSidebar";
import StudentTopBar from "./StudentTopBar";

const SIDEBAR_EXPANDED = 260;
const SIDEBAR_COLLAPSED = 70;

/**
 * StudentLayout – SaaS AppLayout
 *
 * Uses a flex row at the root level.
 * Sidebar is a flex child with animated width (not fixed-positioned),
 * so the adjacent main content naturally expands/contracts.
 * On mobile: sidebar hidden, drawer rendered absolutely over content.
 */
export default function StudentLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const sidebarWidth = isCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  return (
    <div className="flex min-h-screen bg-[#0a0e27] text-white relative">

      {/* ── Desktop Sidebar (md+): flex child so main content expands ── */}
      <div
        className="hidden md:flex flex-col flex-shrink-0 sticky top-0 h-screen overflow-hidden"
        style={{
          width: sidebarWidth,
          minWidth: sidebarWidth,
          transition: "width 0.3s cubic-bezier(0.4,0,0.2,1), min-width 0.3s cubic-bezier(0.4,0,0.2,1)",
          background: "linear-gradient(180deg, #0d1128 0%, #0a0f20 100%)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <StudentSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          onClose={() => setMobileSidebarOpen(false)}
        />
      </div>

      {/* ── Mobile Overlay ── */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── Mobile Sidebar Drawer ── */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            className="fixed left-0 top-0 h-screen z-50 md:hidden overflow-hidden flex flex-col"
            style={{
              width: SIDEBAR_EXPANDED,
              background: "linear-gradient(180deg, #0d1128 0%, #0a0f20 100%)",
              borderRight: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <StudentSidebar
              isCollapsed={false}
              setIsCollapsed={() => {}}
              onClose={() => setMobileSidebarOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Content (always fills remaining space) ── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Sticky Topbar */}
        <div className="sticky top-0 z-30">
          <StudentTopBar
            isCollapsed={isCollapsed}
            mobileSidebarOpen={mobileSidebarOpen}
            setMobileSidebarOpen={setMobileSidebarOpen}
          />
        </div>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto relative">
          {children}
        </main>
      </div>
    </div>
  );
}

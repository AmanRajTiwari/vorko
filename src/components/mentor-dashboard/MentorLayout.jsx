import React, { useState } from "react";
import { motion } from "framer-motion";
import MentorSidebar from "./MentorSidebar";
import MentorTopBar from "./MentorTopBar";
import Toast from "./Toast";
import { useData } from "../../context/DataContext";

export default function MentorLayout({ children, pageTitle, pageDescription }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toastMessage } = useData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="flex h-screen bg-dark text-white overflow-hidden">
      {/* Sidebar */}
      <MentorSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <MentorTopBar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          pageTitle={pageTitle}
        />

        {/* Page Content */}
        <motion.main
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page Header */}
          {pageTitle && (
            <motion.div className="mb-8" variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                {pageTitle}
              </h1>
              {pageDescription && (
                <p className="text-gray-400">{pageDescription}</p>
              )}
            </motion.div>
          )}

          {/* Page Content */}
          {children}
        </motion.main>
      </div>

      {/* Toast Notification */}
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import CommandPalette from "./CommandPalette";
import SmartOverviewPanel from "./cards/SmartOverviewPanel";
import ContributionHeatmap from "./cards/ContributionHeatmap";
import ProjectTimeline from "./cards/ProjectTimeline";
import FocusMode from "./cards/FocusMode";
import MentorFeedbackSpotlight from "./cards/MentorFeedbackSpotlight";
import VivaReadinessMeter from "./cards/VivaReadinessMeter";
import ProjectOverview from "./cards/ProjectOverview";
import TaskSummary from "./cards/TaskSummary";
import TeamContribution from "./cards/TeamContribution";
import UpcomingMeetings from "./cards/UpcomingMeetings";
import RecentActivity from "./cards/RecentActivity";
import QuickActions from "./cards/QuickActions";

export default function Dashboard({ onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleBackToLanding = () => {
    window.history.pushState({}, "", "/");
    if (onNavigate) onNavigate("landing");
  };

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
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          onBack={handleBackToLanding}
        />

        {/* Dashboard Content */}
        <motion.main
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-400">
                Track your progress, insights, and viva readiness in one place.
              </p>
            </motion.div>

            {/* ADVANCED FEATURE SECTION 1: Smart Overview + Command Palette */}
            <motion.div variants={itemVariants}>
              <SmartOverviewPanel />
            </motion.div>

            {/* ADVANCED FEATURE SECTION 2: Viva Readiness Meter (Full Width) */}
            <motion.div variants={itemVariants}>
              <VivaReadinessMeter />
            </motion.div>

            {/* ADVANCED FEATURE SECTION 3: Contribution Heatmap + Focus Mode */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <ContributionHeatmap />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FocusMode />
              </motion.div>
            </div>

            {/* ADVANCED FEATURE SECTION 4: Project Timeline + Mentor Feedback */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <ProjectTimeline />
              </motion.div>
              <motion.div variants={itemVariants}>
                <MentorFeedbackSpotlight />
              </motion.div>
            </div>

            {/* DIVIDER */}
            <motion.div
              variants={itemVariants}
              className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
            />

            {/* CLASSIC DASHBOARD SECTION: Overview & Quick Actions */}
            <motion.div variants={itemVariants} className="mb-4">
              <h2 className="text-xl font-bold mb-4">Project Overview</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <ProjectOverview />
              </motion.div>
              <motion.div variants={itemVariants}>
                <QuickActions />
              </motion.div>
            </div>

            {/* Task Summary + Team Contribution Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <TaskSummary />
              </motion.div>
              <motion.div variants={itemVariants}>
                <TeamContribution />
              </motion.div>
            </div>

            {/* Meetings + Activity Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <UpcomingMeetings />
              </motion.div>
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <RecentActivity />
              </motion.div>
            </div>
          </div>
        </motion.main>

        {/* Command Palette */}
        <CommandPalette />
      </div>
    </div>
  );
}

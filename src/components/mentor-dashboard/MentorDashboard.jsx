import React, { useState } from "react";
import { motion } from "framer-motion";
import MentorLayout from "./MentorLayout";
import OverviewMetrics from "./cards/OverviewMetrics";
import ProjectsOverview from "./cards/ProjectsOverview";
import StudentContributionInsight from "./cards/StudentContributionInsight";
import PendingReviews from "./cards/PendingReviews";
import MeetingsDiscussions from "./cards/MeetingsDiscussions";
import VivaReadiness from "./cards/VivaReadiness";

export default function MentorDashboard({ onNavigate }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
    <MentorLayout
      pageTitle="Dashboard"
      pageDescription="Manage your projects and guide your students"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Overview Metrics */}
        <motion.div variants={itemVariants} className="mb-8">
          <OverviewMetrics />
        </motion.div>

        {/* Main Grid - Projects & Contributions */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Projects Overview - Takes 2 columns on desktop */}
          <div className="lg:col-span-2">
            <ProjectsOverview
              selectedProject={selectedProject}
              onProjectSelect={setSelectedProject}
            />
          </div>

          {/* Student Contribution */}
          <div className="lg:col-span-1">
            <StudentContributionInsight projectId={selectedProject} />
          </div>
        </motion.div>

        {/* Bottom Row - Reviews, Meetings, Viva */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Pending Reviews */}
          <div className="lg:col-span-1">
            <PendingReviews />
          </div>

          {/* Meetings & Discussions */}
          <div className="lg:col-span-1">
            <MeetingsDiscussions />
          </div>

          {/* Viva Readiness */}
          <div className="lg:col-span-1">
            <VivaReadiness />
          </div>
        </motion.div>
      </motion.div>
    </MentorLayout>
  );
}

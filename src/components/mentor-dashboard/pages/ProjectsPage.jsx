import React, { useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../../../context/DataContext";
import {
  Users,
  Calendar,
  Target,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import MentorLayout from "../MentorLayout";

function ProjectCard({ project, onClick }) {
  const statusColors = {
    "In Progress": "bg-blue-500/20 text-blue-300",
    Planning: "bg-yellow-500/20 text-yellow-300",
    Completed: "bg-green-500/20 text-green-300",
  };

  const priorityColors = {
    High: "text-red-400",
    Medium: "text-yellow-400",
    Low: "text-green-400",
  };

  return (
    <motion.div
      onClick={onClick}
      className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-6 cursor-pointer hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">{project.name}</h3>
          <p className="text-sm text-gray-400">{project.description}</p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            statusColors[project.status]
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">Progress</span>
          <span className="text-sm font-semibold">{project.progress}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-accent-purple"
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{project.teamCount} members</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400 text-xs">
            {new Date(project.deadline).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Target className={`w-4 h-4 ${priorityColors[project.priority]}`} />
          <span className={`text-sm ${priorityColors[project.priority]}`}>
            {project.priority}
          </span>
        </div>
      </div>

      {/* Click to view */}
      <motion.div
        className="flex items-center justify-between text-accent text-sm font-medium"
        whileHover={{ gap: 8 }}
      >
        <span>View Details</span>
        <ChevronRight className="w-4 h-4" />
      </motion.div>
    </motion.div>
  );
}

function ProjectDetailModal({ project, onClose }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-dark border border-white/10 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-b from-dark/95 to-dark/80 border-b border-white/10 p-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
            <p className="text-gray-400">{project.category}</p>
          </div>
          <motion.button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ✕
          </motion.button>
        </div>

        {/* Content */}
        <motion.div
          className="p-6 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status & Progress */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">
              Status & Progress
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <p className="text-lg font-semibold">{project.status}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Progress</p>
                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-accent-purple rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <p className="text-sm">{project.progress}%</p>
              </div>
            </div>
          </motion.div>

          {/* Milestones */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">
              Milestones
            </h3>
            <div className="space-y-2">
              {project.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-center gap-3 p-2 rounded hover:bg-white/5"
                >
                  <motion.div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                      milestone.completed
                        ? "bg-accent border-accent"
                        : "border-white/20"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {milestone.completed && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-dark text-xs font-bold"
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.div>
                  <span
                    className={
                      milestone.completed
                        ? "line-through text-gray-500"
                        : "text-white"
                    }
                  >
                    {milestone.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Team Members */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">
              Team Members
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {project.team.map((member, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded p-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="font-medium">{member}</p>
                  <p className="text-sm text-gray-400">
                    {project.contributionStats[member]}% contribution
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">
              Timeline
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 rounded hover:bg-white/5">
                <span className="text-gray-400">Start Date</span>
                <span>{new Date(project.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded hover:bg-white/5">
                <span className="text-gray-400">Deadline</span>
                <span className="text-accent font-semibold">
                  {new Date(project.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { projects } = useData();
  const [selectedProject, setSelectedProject] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MentorLayout
      pageTitle="Assigned Projects"
      pageDescription="Manage and monitor your student projects"
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <ProjectCard
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </MentorLayout>
  );
}

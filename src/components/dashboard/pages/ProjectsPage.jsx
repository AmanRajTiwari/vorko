import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Users,
  Calendar,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { StudentDataContext } from "../../../context/StudentContext";

export default function ProjectsPage() {
  const { projects, activeProjectId, switchActiveProject } =
    useContext(StudentDataContext);
  const [selectedProject, setSelectedProject] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "from-accent to-accent-purple";
      case "Planning":
        return "from-blue-500 to-blue-600";
      case "Completed":
        return "from-green-500 to-emerald-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="text-gray-400">Manage and track all your projects.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => {
              switchActiveProject(project.id);
              setSelectedProject(project.id);
            }}
            className={`glass-effect p-6 rounded-xl border cursor-pointer transition-all ${
              activeProjectId === project.id
                ? "border-accent/50 bg-accent/10"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${getStatusColor(
                  project.status
                )}`}
              >
                <FolderOpen size={24} className="text-white" />
              </div>
              {activeProjectId === project.id && (
                <div className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold">
                  Active
                </div>
              )}
            </div>

            <h3 className="text-lg font-bold mb-2">{project.name}</h3>
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Status & Progress */}
            <div className="space-y-3 mb-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Status</span>
                <span className="text-xs font-semibold text-accent">
                  {project.status}
                </span>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Progress</span>
                  <span className="text-xs font-bold">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.6 }}
                    className={`h-full bg-gradient-to-r ${getStatusColor(
                      project.status
                    )}`}
                  />
                </div>
              </div>
            </div>

            {/* Team & Deadline */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users size={16} />
                <span>{project.teamMembers.length} team members</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar size={16} />
                <span>Due: {project.upcomingDeadline}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed View */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect p-8 rounded-xl border border-white/10"
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {(() => {
              const project = projects.find((p) => p.id === selectedProject);
              return (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
                    <p className="text-gray-400">{project.description}</p>
                  </div>

                  {/* Milestones */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">Milestones</h3>
                    <div className="space-y-3">
                      {project.milestones.map((milestone, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <div
                            className={`w-3 h-3 rounded-full flex-shrink-0 ${
                              milestone.status === "Completed"
                                ? "bg-green-500"
                                : milestone.status === "In Progress"
                                ? "bg-accent"
                                : "bg-gray-500"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">
                              {milestone.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Due: {milestone.dueDate}
                            </p>
                          </div>
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10">
                            {milestone.status}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Repository Link */}
                  <motion.a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} />
                    <span>View Repository</span>
                  </motion.a>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

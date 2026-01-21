import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Clock, Users } from "lucide-react";

export default function ProjectsOverview({ selectedProject, onProjectSelect }) {
  const projects = [
    {
      id: 1,
      name: "AI Chatbot",
      type: "Major",
      teamSize: 4,
      progress: 75,
      lastActivity: "2 hours ago",
      needsReview: true,
    },
    {
      id: 2,
      name: "Database Design",
      type: "Minor",
      teamSize: 3,
      progress: 60,
      lastActivity: "5 hours ago",
      needsReview: false,
    },
    {
      id: 3,
      name: "Web App Frontend",
      type: "Major",
      teamSize: 5,
      progress: 85,
      lastActivity: "30 mins ago",
      needsReview: true,
    },
    {
      id: 4,
      name: "Mobile App",
      type: "Minor",
      teamSize: 2,
      progress: 45,
      lastActivity: "1 day ago",
      needsReview: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="glass-effect rounded-xl p-6 border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Assigned Projects</h2>
        <p className="text-sm text-gray-400">
          Manage and review your mentored projects
        </p>
      </div>

      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <motion.button
            key={project.id}
            variants={itemVariants}
            onClick={() => onProjectSelect(project.id)}
            className={`w-full p-4 rounded-lg border transition-all ${
              selectedProject === project.id
                ? "bg-accent/10 border-accent/50"
                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
            }`}
            whileHover={{ x: 4 }}
          >
            <div className="flex items-start justify-between">
              <div className="text-left flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold">{project.name}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      project.type === "Major"
                        ? "bg-accent/20 text-accent"
                        : "bg-gray-600/20 text-gray-300"
                    }`}
                  >
                    {project.type}
                  </span>
                  {project.needsReview && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center gap-1 text-red-400"
                    >
                      <AlertCircle className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent to-accent-purple"
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {project.progress}% complete
                  </p>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {project.teamSize} members
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {project.lastActivity}
                  </div>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

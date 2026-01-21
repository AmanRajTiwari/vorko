import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function ProjectOverview() {
  const project = {
    name: "AI Chatbot Platform",
    type: "Major Project",
    mentor: "Dr. Sharma",
    progress: 65,
    deadline: "2026-03-15",
    team: 4,
  };

  const daysLeft = Math.ceil(
    (new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );

  const progressVariants = {
    initial: { width: 0 },
    animate: {
      width: `${project.progress}%`,
      transition: { duration: 1.5, ease: "easeOut", delay: 0.3 },
    },
  };

  const badgeVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.5, ease: "backOut", delay: 0.1 },
    },
  };

  return (
    <motion.div
      className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-accent/30 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold">{project.name}</h2>
            <motion.span
              className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/20 text-accent"
              variants={badgeVariants}
              initial="initial"
              animate="animate"
            >
              {project.type}
            </motion.span>
          </div>
          <p className="text-gray-400 text-sm">Your collaborative workspace</p>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-3 rounded-lg bg-white/5"
        >
          <p className="text-xs text-gray-400 mb-1">Mentor</p>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-accent" />
            <p className="font-semibold text-sm">{project.mentor}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="p-3 rounded-lg bg-white/5"
        >
          <p className="text-xs text-gray-400 mb-1">Deadline</p>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent-purple" />
            <p className="font-semibold text-sm">{daysLeft} days left</p>
          </div>
        </motion.div>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold">Project Progress</p>
          <motion.span
            className="text-sm font-bold text-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {project.progress}%
          </motion.span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-accent-purple rounded-full"
            variants={progressVariants}
            initial="initial"
            animate="animate"
          />
        </div>
      </div>

      {/* Team + CTA */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[...Array(project.team)].map((_, i) => (
              <motion.div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-purple border-2 border-dark flex items-center justify-center text-xs font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                {i + 1}
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-gray-400">{project.team} team members</p>
        </div>
        <motion.button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-semibold text-sm"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

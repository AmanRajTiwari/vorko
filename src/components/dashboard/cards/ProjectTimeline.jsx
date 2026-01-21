import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Zap } from "lucide-react";

export default function ProjectTimeline() {
  const [expandedPhase, setExpandedPhase] = useState(null);

  const phases = [
    {
      id: "planning",
      name: "Planning Phase",
      duration: "2 weeks",
      status: "completed",
      progress: 100,
      description:
        "Project ideation, requirements gathering, and team alignment",
      milestones: [
        { text: "Define objectives", done: true },
        { text: "Create roadmap", done: true },
        { text: "Assign roles", done: true },
      ],
      startDate: "Jan 1",
      endDate: "Jan 15",
    },
    {
      id: "design",
      name: "Design & Architecture",
      duration: "3 weeks",
      status: "completed",
      progress: 100,
      description: "UI/UX design, system architecture, and database schema",
      milestones: [
        { text: "Wireframes complete", done: true },
        { text: "Design system", done: true },
        { text: "Architecture approved", done: true },
      ],
      startDate: "Jan 15",
      endDate: "Feb 5",
    },
    {
      id: "development",
      name: "Development Sprint",
      duration: "4 weeks",
      status: "in-progress",
      progress: 65,
      description: "Core feature implementation and API development",
      milestones: [
        { text: "Backend setup", done: true },
        { text: "Frontend framework", done: true },
        { text: "Authentication module", done: false },
        { text: "Dashboard features", done: false },
      ],
      startDate: "Feb 5",
      endDate: "Mar 5",
    },
    {
      id: "testing",
      name: "QA & Testing",
      duration: "2 weeks",
      status: "upcoming",
      progress: 0,
      description: "Quality assurance, bug fixes, and performance optimization",
      milestones: [
        { text: "Unit testing", done: false },
        { text: "Integration testing", done: false },
        { text: "Performance review", done: false },
      ],
      startDate: "Mar 5",
      endDate: "Mar 19",
    },
    {
      id: "deployment",
      name: "Deployment & Launch",
      duration: "1 week",
      status: "upcoming",
      progress: 0,
      description: "Production deployment, monitoring, and launch",
      milestones: [
        { text: "Deploy to staging", done: false },
        { text: "Final testing", done: false },
        { text: "Production launch", done: false },
      ],
      startDate: "Mar 19",
      endDate: "Mar 26",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "from-green-400 to-emerald-400";
      case "in-progress":
        return "from-accent to-accent-purple";
      case "upcoming":
        return "from-gray-500 to-gray-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-400/10";
      case "in-progress":
        return "bg-accent/10";
      case "upcoming":
        return "bg-gray-500/10";
      default:
        return "bg-gray-500/10";
    }
  };

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
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="glass-effect rounded-2xl p-6 border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-gradient-to-b from-accent to-accent-purple rounded-full" />
        <h3 className="text-lg font-bold">Project Journey</h3>
      </div>

      {/* Timeline */}
      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {phases.map((phase, idx) => (
          <motion.div key={phase.id} variants={itemVariants}>
            <motion.button
              onClick={() =>
                setExpandedPhase(expandedPhase === phase.id ? null : phase.id)
              }
              whileHover={{ x: 4 }}
              className="w-full text-left"
            >
              <div
                className={`p-4 rounded-xl border border-white/10 ${getStatusBg(
                  phase.status
                )} cursor-pointer transition-all hover:border-white/20`}
              >
                {/* Phase Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Status Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${getStatusColor(
                        phase.status
                      )}`}
                    >
                      {phase.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : phase.status === "in-progress" ? (
                        <Zap className="w-5 h-5 text-white" />
                      ) : (
                        <Circle className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Phase Info */}
                    <div>
                      <p className="font-semibold text-white">{phase.name}</p>
                      <p className="text-xs text-gray-400">
                        {phase.duration} • {phase.startDate} - {phase.endDate}
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="text-right">
                    <p className="text-sm font-bold text-accent">
                      {phase.progress}%
                    </p>
                    <div className="w-20 h-1.5 rounded-full bg-white/10 mt-1 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${getStatusColor(
                          phase.status
                        )}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${phase.progress}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-md ${
                      phase.status === "completed"
                        ? "bg-green-400/20 text-green-300"
                        : phase.status === "in-progress"
                        ? "bg-accent/20 text-accent"
                        : "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {phase.status === "completed"
                      ? "✓ Completed"
                      : phase.status === "in-progress"
                      ? "⚡ Active"
                      : "◯ Upcoming"}
                  </span>

                  <motion.div
                    animate={{
                      rotate: expandedPhase === phase.id ? 180 : 0,
                    }}
                  >
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.button>

            {/* Expanded Details */}
            <AnimatePresence>
              {expandedPhase === phase.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 mt-2 rounded-lg bg-white/5 border border-white/10 border-t-0 border-tr-none rounded-t-none">
                    <p className="text-sm text-gray-300 mb-3">
                      {phase.description}
                    </p>

                    {/* Milestones */}
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 font-semibold mb-2">
                        Milestones
                      </p>
                      {phase.milestones.map((milestone, mIdx) => (
                        <motion.div
                          key={mIdx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: mIdx * 0.05 }}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div
                            className={`w-4 h-4 rounded-full flex-shrink-0 ${
                              milestone.done ? "bg-green-400" : "bg-white/20"
                            }`}
                          />
                          <span
                            className={
                              milestone.done
                                ? "text-gray-400 line-through"
                                : "text-gray-300"
                            }
                          >
                            {milestone.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Timeline Summary */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          Phase {phases.findIndex((p) => p.status === "in-progress") + 1} of{" "}
          {phases.length}
        </span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-gray-400">Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs text-gray-400">Active</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, AlertCircle, BookOpen } from "lucide-react";

export default function VivaReadinessMeter() {
  const readinessScore = 78;
  const maxScore = 100;

  const checklist = [
    {
      id: "documentation",
      label: "Project Documentation",
      description: "API docs, Architecture, Setup guide",
      completed: true,
      weight: 15,
    },
    {
      id: "testing",
      label: "Testing & QA",
      description: "Unit tests, Integration tests passed",
      completed: true,
      weight: 15,
    },
    {
      id: "performance",
      label: "Performance Optimization",
      description: "Load times, Optimization done",
      completed: true,
      weight: 10,
    },
    {
      id: "features",
      label: "Core Features Complete",
      description: "All required features implemented",
      completed: true,
      weight: 20,
    },
    {
      id: "security",
      label: "Security Review",
      description: "No vulnerabilities, Best practices",
      completed: false,
      weight: 15,
    },
    {
      id: "presentation",
      label: "Presentation Ready",
      description: "Slides, Demo prepared, Story ready",
      completed: false,
      weight: 15,
    },
    {
      id: "deployment",
      label: "Deployment Ready",
      description: "Production setup, Monitoring",
      completed: false,
      weight: 10,
    },
  ];

  const completedItems = checklist.filter((item) => item.completed).length;
  const totalItems = checklist.length;
  const completedWeight = useMemo(
    () =>
      checklist
        .filter((item) => item.completed)
        .reduce((sum, item) => sum + item.weight, 0),
    [checklist]
  );

  const getReadinessLevel = (score) => {
    if (score >= 90)
      return {
        label: "Excellent",
        color: "from-green-400 to-emerald-500",
        textColor: "text-green-300",
      };
    if (score >= 75)
      return {
        label: "Good",
        color: "from-accent to-accent-purple",
        textColor: "text-accent",
      };
    if (score >= 50)
      return {
        label: "Fair",
        color: "from-yellow-400 to-orange-400",
        textColor: "text-yellow-300",
      };
    return {
      label: "Needs Work",
      color: "from-red-400 to-orange-400",
      textColor: "text-red-300",
    };
  };

  const readinessLevel = getReadinessLevel(readinessScore);

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
        <h3 className="text-lg font-bold">Viva Readiness</h3>
      </div>

      {/* Circular Progress Meter */}
      <div className="relative w-40 h-40 mx-auto mb-6">
        {/* Background circle */}
        <svg className="absolute inset-0" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <motion.circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="url(#readinessGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 314" }}
            animate={{
              strokeDasharray: [`0 314`, `${(readinessScore / 100) * 314} 314`],
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "60px 60px",
            }}
          />
          <defs>
            <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%">
              <stop offset="0%" stopColor="#00d9ff" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <div className="text-4xl font-bold mb-1">{readinessScore}%</div>
            <div
              className={`text-sm font-semibold ${readinessLevel.textColor}`}
            >
              {readinessLevel.label}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Status Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-3 rounded-lg bg-accent/10 border border-accent/30 text-center text-sm text-accent mb-6"
      >
        You're on track! Complete {totalItems - completedItems} more items to
        reach 100%.
      </motion.div>

      {/* Checklist */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Readiness Checklist
        </p>

        <motion.div
          className="space-y-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {checklist.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className={`p-3 rounded-lg border transition-all cursor-pointer group ${
                item.completed
                  ? "bg-green-400/10 border-green-400/30 hover:bg-green-400/20"
                  : "bg-red-400/10 border-red-400/30 hover:bg-red-400/20"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <div className="flex-shrink-0 mt-0.5">
                  {item.completed ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </motion.div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-red-400" />
                  )}
                </div>

                {/* Item Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      item.completed ? "text-green-200" : "text-red-200"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.description}
                  </p>
                </div>

                {/* Weight Badge */}
                <div className="flex-shrink-0 px-2 py-1 rounded-md bg-white/10 text-xs font-medium text-gray-300">
                  +{item.weight}%
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Progress Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between"
      >
        <div>
          <p className="text-xs text-gray-400 mb-1">Completed</p>
          <p className="text-lg font-bold">
            {completedItems}/{totalItems}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 mb-1">Weight</p>
          <p className="text-lg font-bold">
            {completedWeight}/{maxScore}%
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-purple text-white text-sm font-medium cursor-pointer"
        >
          View Plan
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

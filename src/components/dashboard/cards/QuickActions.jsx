import React from "react";
import { motion } from "framer-motion";
import { Plus, Calendar, FileText, Zap } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      id: "task",
      icon: Plus,
      label: "Add Task",
      description: "Create new task",
      color: "from-accent to-accent-purple",
    },
    {
      id: "meeting",
      icon: Calendar,
      label: "Schedule",
      description: "Plan meeting",
      color: "from-accent-purple to-accent-blue",
    },
    {
      id: "report",
      icon: FileText,
      label: "Report",
      description: "Generate report",
      color: "from-accent-blue to-accent",
    },
    {
      id: "viva",
      icon: Zap,
      label: "Viva Mode",
      description: "Prepare viva",
      color: "from-orange-500 to-accent",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "backOut" },
    },
  };

  return (
    <motion.div
      className="glass-effect rounded-2xl p-6 border border-white/10 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <h3 className="text-lg font-bold mb-4">Quick Actions</h3>

      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <motion.button
              key={action.id}
              variants={itemVariants}
              className="w-full group relative overflow-hidden rounded-lg p-4 text-left transition-all"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-10 group-hover:opacity-20 transition-opacity`}
              />

              {/* Border gradient */}
              <div
                className={`absolute inset-0 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors`}
              />

              {/* Content */}
              <div className="relative z-10 flex items-start gap-3">
                <motion.div
                  className={`p-2 rounded-lg bg-gradient-to-br ${action.color} bg-opacity-20`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{action.label}</p>
                  <p className="text-xs text-gray-400">{action.description}</p>
                </div>
                <motion.div
                  className="text-gray-600 group-hover:text-white transition-colors"
                  initial={{ x: -5, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                >
                  →
                </motion.div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function TaskSummary() {
  const tasks = {
    todo: 5,
    inProgress: 3,
    done: 12,
  };

  const totalTasks = tasks.todo + tasks.inProgress + tasks.done;

  const taskSections = [
    {
      id: "todo",
      label: "To Do",
      count: tasks.todo,
      icon: AlertCircle,
      color: "text-orange-400",
      bg: "bg-orange-400/20",
    },
    {
      id: "inProgress",
      label: "In Progress",
      count: tasks.inProgress,
      icon: Clock,
      color: "text-accent",
      bg: "bg-accent/20",
    },
    {
      id: "done",
      label: "Done",
      count: tasks.done,
      icon: CheckCircle2,
      color: "text-green-400",
      bg: "bg-green-400/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="glass-effect rounded-2xl p-6 border border-white/10 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <h3 className="text-lg font-bold mb-6">Task Summary</h3>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {taskSections.map((section, idx) => {
          const Icon = section.icon;
          const percentage = (section.count / totalTasks) * 100;

          return (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${section.bg}`}>
                    <Icon className={`w-4 h-4 ${section.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{section.label}</p>
                    <p className="text-xs text-gray-400">
                      {section.count} items
                    </p>
                  </div>
                </div>
                <motion.span
                  className={`text-lg font-bold ${section.color}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                >
                  {section.count}
                </motion.span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${section.bg}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                    delay: 0.3 + idx * 0.1,
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Total Progress */}
      <motion.div
        className="mt-6 pt-6 border-t border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-400">Overall Completion</p>
          <p className="text-sm font-bold text-accent">
            {Math.round((tasks.done / totalTasks) * 100)}%
          </p>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-accent-purple"
            initial={{ width: 0 }}
            animate={{ width: `${(tasks.done / totalTasks) * 100}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

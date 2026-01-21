import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, MessageSquare } from "lucide-react";

export default function SmartOverviewPanel() {
  // Mock data
  const vivaReadiness = 78;
  const blockedTasks = 2;
  const pendingFeedback = 3;

  const insights = [
    {
      id: "viva",
      label: "Viva Readiness",
      value: `${vivaReadiness}%`,
      icon: TrendingUp,
      color: "from-accent to-accent-purple",
      bgColor: "bg-accent/10",
      status: "On Track",
      statusColor: "text-green-400",
    },
    {
      id: "blocked",
      label: "Blocked Tasks",
      value: blockedTasks,
      icon: AlertCircle,
      color: "from-orange-400 to-red-400",
      bgColor: "bg-orange-400/10",
      status: "Need Attention",
      statusColor: "text-orange-400",
    },
    {
      id: "feedback",
      label: "Pending Feedback",
      value: pendingFeedback,
      icon: MessageSquare,
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-400/10",
      status: "Review Soon",
      statusColor: "text-blue-400",
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="glass-effect rounded-2xl p-6 border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-gradient-to-b from-accent to-accent-purple rounded-full" />
        <h3 className="text-lg font-bold">AI Insights</h3>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.id}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`p-4 rounded-xl border border-white/10 ${insight.bgColor} backdrop-blur-sm cursor-pointer group transition-all`}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${insight.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>

              {/* Label & Value */}
              <p className="text-sm text-gray-400 mb-1">{insight.label}</p>
              <p className="text-2xl font-bold mb-2">{insight.value}</p>

              {/* Status */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className={`text-xs font-medium ${insight.statusColor}`}>
                  {insight.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Alert */}
      {blockedTasks > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 p-3 rounded-lg bg-orange-400/10 border border-orange-400/30 flex items-gap-3"
        >
          <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-orange-100">
            {blockedTasks} task{blockedTasks > 1 ? "s" : ""} blocked - Review
            and unblock
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

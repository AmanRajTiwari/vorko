import React from "react";
import { motion } from "framer-motion";
import { FolderOpen, AlertCircle, Calendar, Trophy } from "lucide-react";

export default function OverviewMetrics() {
  const metrics = [
    {
      label: "Total Projects",
      value: "12",
      icon: FolderOpen,
      color: "from-accent to-accent-purple",
      bgColor: "bg-accent/10",
    },
    {
      label: "Need Review",
      value: "4",
      icon: AlertCircle,
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500/10",
    },
    {
      label: "Upcoming Meetings",
      value: "7",
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Viva Ready",
      value: "8",
      icon: Trophy,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={idx}
            className="glass-effect rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors"
            variants={cardVariants}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 ${metric.bgColor} rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
            >
              <p className="text-3xl font-bold mb-1">{metric.value}</p>
            </motion.div>

            <p className="text-sm text-gray-400">{metric.label}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

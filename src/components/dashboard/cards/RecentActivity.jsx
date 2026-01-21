import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, MessageSquare, MoreVertical } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: "You",
      action: "completed task",
      target: "Design UI mockups",
      time: "2 hours ago",
      type: "complete",
    },
    {
      id: 2,
      user: "Priya Singh",
      action: "added comment on",
      target: "API Documentation",
      time: "4 hours ago",
      type: "comment",
    },
    {
      id: 3,
      user: "Raj Patel",
      action: "started working on",
      target: "Backend Implementation",
      time: "6 hours ago",
      type: "start",
    },
    {
      id: 4,
      user: "Dr. Sharma",
      action: "left feedback on",
      target: "Project Progress",
      time: "1 day ago",
      type: "feedback",
    },
    {
      id: 5,
      user: "Emma Davis",
      action: "identified issue in",
      target: "Testing Phase",
      time: "1 day ago",
      type: "issue",
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "complete":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case "comment":
        return <MessageSquare className="w-5 h-5 text-accent" />;
      case "start":
        return <Clock className="w-5 h-5 text-accent-purple" />;
      case "feedback":
        return <MessageSquare className="w-5 h-5 text-accent-blue" />;
      case "issue":
        return <MoreVertical className="w-5 h-5 text-orange-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="glass-effect rounded-2xl p-6 border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <h3 className="text-lg font-bold mb-6">Recent Activity</h3>

      <motion.div
        className="space-y-4 max-h-96 overflow-y-auto pr-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {activities.map((activity, idx) => (
          <motion.div
            key={activity.id}
            variants={itemVariants}
            className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            whileHover={{ scale: 1.01 }}
          >
            {/* Avatar + Icon */}
            <motion.div
              className="relative flex-shrink-0"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-xs font-bold">
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-dark border border-white/10 rounded-lg p-1">
                {getActivityIcon(activity.type)}
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-semibold">{activity.user}</span>
                <span className="text-gray-400"> {activity.action} </span>
                <span className="font-semibold text-accent">
                  {activity.target}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>

            {/* Chevron */}
            <motion.div
              className="flex-shrink-0 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ x: 3 }}
            >
              →
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Load More */}
      <motion.button
        className="w-full mt-6 text-accent hover:text-accent-purple transition-colors text-sm font-semibold py-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
      >
        View All Activity
      </motion.button>
    </motion.div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Star, AlertCircle, CheckCircle2 } from "lucide-react";

export default function MentorFeedbackSpotlight() {
  const [selectedFeedback, setSelectedFeedback] = useState(0);

  const feedbackItems = [
    {
      id: 1,
      mentor: "Dr. Anil Kumar",
      role: "Project Mentor",
      avatar: "👨‍🏫",
      priority: "high",
      date: "2 days ago",
      comment:
        "Great work on the authentication module! Consider implementing JWT token refresh mechanism for better security.",
      actionRequired: true,
      tags: ["Security", "Backend"],
    },
    {
      id: 2,
      mentor: "Prof. Priya Singh",
      role: "Tech Lead",
      avatar: "👩‍💼",
      priority: "medium",
      date: "1 week ago",
      comment:
        "The UI design looks polished. Make sure to optimize images for faster load times.",
      actionRequired: false,
      tags: ["Performance", "Frontend"],
    },
    {
      id: 3,
      mentor: "Dr. Anil Kumar",
      role: "Project Mentor",
      avatar: "👨‍🏫",
      priority: "high",
      date: "3 days ago",
      comment:
        "Database schema needs revision. Consider normalizing the users table to avoid redundancy.",
      actionRequired: true,
      tags: ["Database", "Architecture"],
    },
    {
      id: 4,
      mentor: "Prof. Rajesh Patel",
      role: "Viva Coordinator",
      avatar: "👨‍🎓",
      priority: "medium",
      date: "5 days ago",
      comment:
        "Document your API endpoints properly. This will help during viva presentation.",
      actionRequired: false,
      tags: ["Documentation", "Viva"],
    },
  ];

  const current = feedbackItems[selectedFeedback];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "from-red-400 to-orange-400";
      case "medium":
        return "from-yellow-400 to-orange-400";
      case "low":
        return "from-green-400 to-emerald-400";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-400/20";
      case "medium":
        return "bg-yellow-400/20";
      case "low":
        return "bg-green-400/20";
      default:
        return "bg-gray-400/20";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high":
        return "🔴 High Priority";
      case "medium":
        return "🟡 Medium Priority";
      case "low":
        return "🟢 Low Priority";
      default:
        return "Priority";
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
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
        <h3 className="text-lg font-bold">Mentor Feedback</h3>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="ml-auto px-2 py-1 rounded-md bg-red-400/20 text-red-300 text-xs font-medium"
        >
          {feedbackItems.filter((f) => f.actionRequired).length} Action items
        </motion.div>
      </div>

      {/* Main Feedback Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`p-5 rounded-xl border border-white/10 ${getPriorityBg(
            current.priority
          )} mb-4`}
        >
          {/* Priority Badge */}
          <div className="flex items-center justify-between mb-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r ${getPriorityColor(
                current.priority
              )} text-white text-xs font-medium`}
            >
              {current.priority === "high" && (
                <AlertCircle className="w-3 h-3" />
              )}
              {getPriorityLabel(current.priority)}
            </motion.div>

            {current.actionRequired && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="px-2 py-1 rounded-md bg-red-500/20 text-red-300 text-xs font-medium"
              >
                ⚡ Action Required
              </motion.div>
            )}
          </div>

          {/* Mentor Info */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-lg">
              {current.avatar}
            </div>
            <div>
              <p className="font-semibold text-white">{current.mentor}</p>
              <p className="text-xs text-gray-400">{current.role}</p>
            </div>
            <span className="ml-auto text-xs text-gray-400">
              {current.date}
            </span>
          </div>

          {/* Comment */}
          <p className="text-sm text-gray-200 mb-4 leading-relaxed">
            "{current.comment}"
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {current.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ y: -2 }}
                className="px-2 py-1 rounded-md bg-white/10 text-xs text-gray-300"
              >
                #{tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 px-3 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 text-sm font-medium transition-all"
        >
          <CheckCircle2 className="w-4 h-4 inline mr-1" />
          Mark as Resolved
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 text-sm font-medium transition-all"
        >
          <Star className="w-4 h-4 inline mr-1" />
          Save
        </motion.button>
      </div>

      {/* Feedback List */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
          All Feedback
        </p>

        <motion.div
          className="space-y-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {feedbackItems.map((item, idx) => (
            <motion.button
              key={item.id}
              variants={itemVariants}
              onClick={() => setSelectedFeedback(idx)}
              whileHover={{ x: 4 }}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                selectedFeedback === idx
                  ? "bg-white/10 border border-accent/50"
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                {item.actionRequired && (
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {item.mentor}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {item.comment.substring(0, 50)}...
                  </p>
                </div>
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.priority === "high"
                      ? "bg-red-400"
                      : item.priority === "medium"
                      ? "bg-yellow-400"
                      : "bg-green-400"
                  }`}
                />
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

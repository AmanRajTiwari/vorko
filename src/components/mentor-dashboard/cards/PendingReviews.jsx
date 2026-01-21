import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle, MessageSquare, ChevronRight } from "lucide-react";

export default function PendingReviews() {
  const navigate = useNavigate();
  const reviews = [
    {
      id: 1,
      title: "Milestone: API Design",
      project: "AI Chatbot",
      submittedBy: "Priyanshi",
      daysAgo: 2,
      priority: "high",
    },
    {
      id: 2,
      title: "Database Schema Review",
      project: "Database Design",
      submittedBy: "Aman",
      daysAgo: 1,
      priority: "medium",
    },
    {
      id: 3,
      title: "UI/UX Mockups",
      project: "Web App Frontend",
      submittedBy: "Emma",
      daysAgo: 3,
      priority: "low",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="glass-effect rounded-xl p-6 border border-white/10 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-6">Pending Reviews</h3>

      <motion.div className="space-y-3">
        {reviews.map((review, idx) => (
          <motion.div
            key={idx}
            className="p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all cursor-pointer"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ x: 4 }}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-semibold">{review.title}</h4>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  review.priority === "high"
                    ? "bg-red-500/20 text-red-400"
                    : review.priority === "medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {review.priority}
              </span>
            </div>

            <p className="text-xs text-gray-400 mb-3">{review.project}</p>

            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">
                by {review.submittedBy} • {review.daysAgo}d ago
              </p>
              <motion.button
                className="p-1.5 hover:bg-accent/20 rounded transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="w-4 h-4 text-accent" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        onClick={() => navigate("/mentor/reviews")}
        className="w-full mt-4 py-2 bg-gradient-to-r from-accent/20 to-accent-purple/20 hover:from-accent/30 hover:to-accent-purple/30 rounded-lg text-sm font-medium text-accent transition-colors flex items-center justify-center gap-1"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View All Reviews
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

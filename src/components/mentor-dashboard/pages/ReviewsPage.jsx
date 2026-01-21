import React, { useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../../../context/DataContext";
import {
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  User,
  Calendar,
} from "lucide-react";
import MentorLayout from "../MentorLayout";

function ReviewCard({ review, onApprove, onReject, onRequestChanges }) {
  const statusIcons = {
    pending: <Clock className="w-5 h-5 text-yellow-400" />,
    approved: <CheckCircle className="w-5 h-5 text-green-400" />,
    rejected: <XCircle className="w-5 h-5 text-red-400" />,
    "changes-requested": <MessageSquare className="w-5 h-5 text-blue-400" />,
  };

  const statusColors = {
    pending: "bg-yellow-500/20 border-yellow-500/50",
    approved: "bg-green-500/20 border-green-500/50",
    rejected: "bg-red-500/20 border-red-500/50",
    "changes-requested": "bg-blue-500/20 border-blue-500/50",
  };

  const statusText = {
    pending: "Pending Review",
    approved: "Approved",
    rejected: "Rejected",
    "changes-requested": "Changes Requested",
  };

  return (
    <motion.div
      className={`border rounded-lg p-6 backdrop-blur-sm ${
        statusColors[review.status]
      }`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {statusIcons[review.status]}
            <span className="text-sm font-semibold">
              {statusText[review.status]}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-1">{review.description}</h3>
          <p className="text-sm text-gray-400">{review.type}</p>
        </div>
      </div>

      {/* Student & Date */}
      <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Student</p>
            <p className="text-sm font-medium">{review.studentName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Submitted</p>
            <p className="text-sm font-medium">
              {new Date(review.submissionDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white/5 rounded p-3 mb-4 max-h-32 overflow-y-auto">
        <p className="text-sm text-gray-300">{review.content}</p>
      </div>

      {/* Feedback if exists */}
      {review.feedback && (
        <div className="bg-green-500/10 border border-green-500/30 rounded p-3 mb-4">
          <p className="text-xs text-green-300 font-semibold mb-1">
            Your Feedback
          </p>
          <p className="text-sm text-green-200">{review.feedback}</p>
        </div>
      )}

      {/* Actions */}
      {review.status === "pending" && (
        <div className="flex gap-2">
          <motion.button
            onClick={() => onApprove(review.id)}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 rounded-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Approve
          </motion.button>
          <motion.button
            onClick={() => onRequestChanges(review.id)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Request Changes
          </motion.button>
          <motion.button
            onClick={() => onReject(review.id)}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 rounded-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Reject
          </motion.button>
        </div>
      )}

      {review.status !== "pending" && (
        <div className="text-center py-2">
          <p className="text-xs text-gray-400">
            This review has been {review.status}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function ReviewsPage() {
  const { reviews, approveReview, rejectReview, requestChanges } = useData();
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredReviews =
    filterStatus === "all"
      ? reviews
      : reviews.filter((r) => r.status === filterStatus);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const approvedCount = reviews.filter((r) => r.status === "approved").length;

  return (
    <MentorLayout
      pageTitle="Reviews & Approvals"
      pageDescription="Manage student submissions and provide feedback"
    >
      {/* Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-400 text-sm">Pending Reviews</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">
            {pendingCount}
          </p>
        </motion.div>
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-400 text-sm">Approved</p>
          <p className="text-3xl font-bold text-green-400 mt-2">
            {approvedCount}
          </p>
        </motion.div>
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-400 text-sm">Total Reviews</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">
            {reviews.length}
          </p>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "pending", "approved", "changes-requested", "rejected"].map(
          (status) => (
            <motion.button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === status
                  ? "bg-accent text-dark"
                  : "bg-white/10 hover:bg-white/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </motion.button>
          )
        )}
      </div>

      {/* Reviews List */}
      {filteredReviews.length > 0 ? (
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredReviews.map((review) => (
            <motion.div key={review.id} variants={itemVariants}>
              <ReviewCard
                review={review}
                onApprove={approveReview}
                onReject={(id) =>
                  rejectReview(id, "Please revise and resubmit")
                }
                onRequestChanges={requestChanges}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-400 text-lg">
            No reviews found for this filter
          </p>
        </motion.div>
      )}
    </MentorLayout>
  );
}

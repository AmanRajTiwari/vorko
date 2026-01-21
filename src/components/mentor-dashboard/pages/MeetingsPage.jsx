import React, { useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../../../context/DataContext";
import {
  Calendar,
  Clock,
  Users,
  MessageSquare,
  Link as LinkIcon,
  FileText,
} from "lucide-react";
import MentorLayout from "../MentorLayout";

function MeetingCard({ meeting, onAddNotes, onJoin }) {
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notes, setNotes] = useState(meeting.notes || "");

  const handleSaveNotes = () => {
    onAddNotes(meeting.id, notes);
    setShowNotesModal(false);
  };

  const isPast = new Date(meeting.date) < new Date();
  const statusColor = isPast
    ? "bg-gray-500/20 text-gray-300"
    : "bg-blue-500/20 text-blue-300";

  return (
    <motion.div
      className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">{meeting.title}</h3>
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}
          >
            {isPast ? "Completed" : "Upcoming"}
          </span>
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Date</p>
            <p className="text-sm font-medium">
              {new Date(meeting.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Time</p>
            <p className="text-sm font-medium">{meeting.time}</p>
          </div>
        </div>
      </div>

      {/* Attendees */}
      <div className="mb-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-gray-400" />
          <p className="text-xs text-gray-500">
            Attendees ({meeting.students.length})
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {meeting.students.map((student, idx) => (
            <motion.span
              key={idx}
              className="text-xs bg-white/10 px-2 py-1 rounded"
              whileHover={{ scale: 1.05 }}
            >
              {student}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Notes */}
      {meeting.notes && (
        <div className="mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-green-400" />
            <p className="text-xs text-green-400 font-semibold">
              Meeting Notes Added
            </p>
          </div>
          <p className="text-sm text-gray-300 bg-white/5 p-2 rounded">
            {meeting.notes}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {!isPast && (
          <motion.button
            onClick={() => onJoin(meeting.id)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LinkIcon className="w-4 h-4" />
            Join Meeting
          </motion.button>
        )}
        <motion.button
          onClick={() => setShowNotesModal(true)}
          className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageSquare className="w-4 h-4" />
          {meeting.notes ? "Edit" : "Add"} Notes
        </motion.button>
      </div>

      {/* Notes Modal */}
      {showNotesModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNotesModal(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-dark border border-white/10 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className="border-b border-white/10 p-6 flex items-center justify-between">
              <h3 className="text-lg font-bold">Meeting Notes</h3>
              <motion.button
                onClick={() => setShowNotesModal(false)}
                className="text-gray-400 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ✕
              </motion.button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2">
                  Add or edit notes for this meeting
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Type your meeting notes here..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-500 focus:border-accent outline-none resize-none h-32"
                />
              </div>

              <div className="flex gap-2">
                <motion.button
                  onClick={() => setShowNotesModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSaveNotes}
                  className="flex-1 bg-gradient-to-r from-accent to-accent-purple text-white font-semibold py-2 rounded-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Notes
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function MeetingsPage() {
  const { meetings, addMeetingNotes, showToast } = useData();
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredMeetings =
    filterStatus === "all"
      ? meetings
      : meetings.filter((m) => m.status === filterStatus);

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

  const upcomingCount = meetings.filter((m) => m.status === "upcoming").length;
  const completedCount = meetings.filter(
    (m) => m.status === "completed"
  ).length;

  const handleJoinMeeting = (meetingId) => {
    showToast("Opening meeting link...");
    setTimeout(() => {
      showToast("Meeting link opened in new window");
    }, 500);
  };

  return (
    <MentorLayout
      pageTitle="Meetings & Discussions"
      pageDescription="Schedule and manage meetings with your students"
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
          <p className="text-gray-400 text-sm">Upcoming Meetings</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">
            {upcomingCount}
          </p>
        </motion.div>
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-400 text-sm">Completed Meetings</p>
          <p className="text-3xl font-bold text-green-400 mt-2">
            {completedCount}
          </p>
        </motion.div>
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-400 text-sm">Total Meetings</p>
          <p className="text-3xl font-bold text-purple-400 mt-2">
            {meetings.length}
          </p>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "upcoming", "completed"].map((status) => (
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
        ))}
      </div>

      {/* Meetings List */}
      {filteredMeetings.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredMeetings.map((meeting) => (
            <motion.div key={meeting.id} variants={itemVariants}>
              <MeetingCard
                meeting={meeting}
                onAddNotes={addMeetingNotes}
                onJoin={handleJoinMeeting}
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
          <p className="text-gray-400 text-lg">No meetings found</p>
        </motion.div>
      )}
    </MentorLayout>
  );
}

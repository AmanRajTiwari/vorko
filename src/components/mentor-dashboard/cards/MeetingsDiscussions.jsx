import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Users, ChevronRight } from "lucide-react";

export default function MeetingsDiscussions() {
  const navigate = useNavigate();
  const meetings = [
    {
      id: 1,
      title: "AI Chatbot - Project Review",
      project: "AI Chatbot",
      date: "Today",
      time: "2:00 PM",
      attendees: 4,
    },
    {
      id: 2,
      title: "Database Design - Milestone Check",
      project: "Database Design",
      date: "Tomorrow",
      time: "10:00 AM",
      attendees: 3,
    },
    {
      id: 3,
      title: "Web App Frontend - Progress",
      project: "Web App Frontend",
      date: "Jan 5",
      time: "3:30 PM",
      attendees: 5,
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
      <h3 className="text-xl font-bold mb-6">Upcoming Meetings</h3>

      <motion.div className="space-y-3">
        {meetings.map((meeting, idx) => (
          <motion.div
            key={idx}
            className="p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ x: 4 }}
          >
            <h4 className="text-sm font-semibold mb-2">{meeting.title}</h4>

            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                {meeting.date} at {meeting.time}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3" />
                {meeting.attendees} attendees
              </div>
            </div>

            <motion.button
              className="mt-3 w-full py-1.5 text-xs font-medium bg-accent/20 hover:bg-accent/30 text-accent rounded transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Meeting
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        onClick={() => navigate("/mentor/meetings")}
        className="w-full mt-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 rounded-lg text-sm font-medium text-blue-400 transition-colors flex items-center justify-center gap-1"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        All Meetings
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

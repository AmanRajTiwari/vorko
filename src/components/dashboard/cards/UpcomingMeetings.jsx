import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, ArrowRight } from "lucide-react";

export default function UpcomingMeetings() {
  const meetings = [
    {
      id: 1,
      title: "Mentor Session",
      type: "Mentor",
      time: "Today, 3:00 PM",
      icon: "calendar",
      color: "accent",
    },
    {
      id: 2,
      title: "Team Sync",
      type: "Team",
      time: "Tomorrow, 10:00 AM",
      icon: "users",
      color: "accent-purple",
    },
    {
      id: 3,
      title: "Demo Review",
      type: "Review",
      time: "Mar 10, 2:00 PM",
      icon: "review",
      color: "accent-blue",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="glass-effect rounded-2xl p-6 border border-white/10 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Upcoming Meetings</h3>
        <div className="p-2 rounded-lg bg-accent-purple/10">
          <Calendar className="w-4 h-4 text-accent-purple" />
        </div>
      </div>

      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {meetings.map((meeting, idx) => (
          <motion.div
            key={meeting.id}
            variants={itemVariants}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="font-semibold text-sm">{meeting.title}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {meeting.time}
                </div>
              </div>
              <motion.span
                className={`px-2 py-1 rounded text-xs font-semibold bg-${meeting.color}/20 text-${meeting.color}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                {meeting.type}
              </motion.span>
            </div>

            {idx === 0 && (
              <motion.button
                className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors text-sm font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Video className="w-4 h-4" />
                Join Now
              </motion.button>
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        className="w-full mt-6 flex items-center justify-center gap-2 text-accent hover:text-accent-purple transition-colors text-sm font-semibold"
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        View Calendar
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

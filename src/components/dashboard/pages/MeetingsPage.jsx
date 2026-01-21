import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Video,
  MessageSquare,
  Plus,
} from "lucide-react";
import { StudentDataContext } from "../../../context/StudentContext";

export default function MeetingsPage() {
  const { activeMeetings, addMeetingNotes } = useContext(StudentDataContext);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [notes, setNotes] = useState("");
  const [showAddMeeting, setShowAddMeeting] = useState(false);

  const upcomingMeetings = activeMeetings.filter(
    (m) => m.status === "Upcoming"
  );
  const pastMeetings = activeMeetings.filter((m) => m.status === "Completed");

  const handleSaveNotes = () => {
    if (selectedMeeting && notes.trim()) {
      addMeetingNotes(selectedMeeting.id, notes);
      setNotes("");
    }
  };

  return (
    <div className="min-h-screen p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Meetings</h1>
            <p className="text-gray-400">
              Track and manage your project meetings.
            </p>
          </div>
          <motion.button
            onClick={() => setShowAddMeeting(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-purple text-dark font-semibold hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            Schedule Meeting
          </motion.button>
        </div>
      </motion.div>

      {/* Upcoming Meetings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-6">Upcoming Meetings</h2>
        {upcomingMeetings.length === 0 ? (
          <p className="text-gray-400">No upcoming meetings scheduled</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingMeetings.map((meeting, idx) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedMeeting(meeting)}
                className="glass-effect p-6 rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 to-accent-purple/10 hover:border-accent/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{meeting.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {meeting.description}
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold">
                    Upcoming
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/20">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Calendar size={16} />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Clock size={16} />
                    <span>
                      {meeting.time} ({meeting.duration} mins)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Users size={16} />
                    <span>{meeting.attendees.length} attendees</span>
                  </div>
                </div>

                <motion.button
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Video size={16} />
                  Join Meeting
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Past Meetings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Past Meetings</h2>
        {pastMeetings.length === 0 ? (
          <p className="text-gray-400">No past meetings</p>
        ) : (
          <div className="space-y-4">
            {pastMeetings.map((meeting, idx) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedMeeting(meeting)}
                className="glass-effect p-6 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">{meeting.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      {meeting.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>
                        {meeting.date} at {meeting.time}
                      </span>
                      <span>•</span>
                      <span>{meeting.attendees.length} attendees</span>
                    </div>
                  </div>
                  {meeting.notes && (
                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                      Notes Added
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Meeting Details Modal */}
      <AnimatePresence>
        {selectedMeeting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMeeting(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect p-8 rounded-xl border border-white/10 w-full max-w-2xl max-h-96 overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-4">
                {selectedMeeting.title}
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Description</p>
                  <p className="text-gray-300">{selectedMeeting.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Date & Time</p>
                    <p className="text-gray-300">
                      {selectedMeeting.date} at {selectedMeeting.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Duration</p>
                    <p className="text-gray-300">
                      {selectedMeeting.duration} minutes
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Attendees</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMeeting.attendees.map((attendee, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-white/10 text-sm text-gray-300"
                      >
                        {attendee.name}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedMeeting.meetingLink && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Meeting Link</p>
                    <motion.a
                      href={selectedMeeting.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                      whileHover={{ scale: 1.05 }}
                    >
                      {selectedMeeting.meetingLink}
                    </motion.a>
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Meeting Notes
                </label>
                <textarea
                  value={notes || selectedMeeting.notes || ""}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes from this meeting..."
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent transition-colors resize-none"
                  rows="4"
                />
                <motion.button
                  onClick={handleSaveNotes}
                  className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-purple text-dark font-semibold hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Notes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Meeting Modal */}
      <AnimatePresence>
        {showAddMeeting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddMeeting(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect p-8 rounded-xl border border-white/10 w-full max-w-md space-y-4"
            >
              <h2 className="text-2xl font-bold">Schedule Meeting</h2>
              <p className="text-sm text-gray-400">
                Coming soon - Schedule functionality coming in next update
              </p>
              <motion.button
                onClick={() => setShowAddMeeting(false)}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-purple text-dark font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

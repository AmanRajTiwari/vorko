import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Users, Mail, Percent, Badge, Crown } from "lucide-react";
import { StudentDataContext } from "../../../context/StudentContext";

export default function TeamPage() {
  const { activeProject, vivaData } = useContext(StudentDataContext);

  const teamMembers = activeProject?.teamMembers || [];
  const contributionData = vivaData.contributionProof || [];
  const mentor = activeProject?.mentor;

  return (
    <div className="min-h-screen p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-bold">Team Members</h1>
        <p className="text-gray-400">
          View your team and contribution insights.
        </p>
      </motion.div>

      {/* Mentor Section */}
      {mentor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-effect p-8 rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 to-accent-purple/10"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-accent to-accent-purple">
              <Crown size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-2">Your Mentor</h2>
              <p className="text-lg mb-1">{mentor.name}</p>
              <p className="text-sm text-gray-400">{mentor.expertise}</p>
              <p className="text-sm text-gray-400 mt-2">{mentor.email}</p>
              <motion.button
                className="mt-4 px-4 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors text-sm font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Team Members */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">
          Team Members ({teamMembers.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => {
            const contribution = contributionData.find(
              (c) => c.contributor === member.name
            );
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-effect p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{member.name}</h3>
                    <p className="text-sm text-accent font-semibold">
                      {member.role}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-dark font-bold">
                    {member.name.charAt(0)}
                  </div>
                </div>

                {contribution && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4 pt-4 border-t border-white/10"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400 flex items-center gap-2">
                          <Percent size={16} />
                          Contribution
                        </span>
                        <span className="font-bold">
                          {contribution.percentage}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${contribution.percentage}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-accent to-accent-purple"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Badge size={16} />
                      <span>{contribution.commits} commits</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Contribution Breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-effect p-8 rounded-xl border border-white/10"
      >
        <h2 className="text-2xl font-bold mb-6">Contribution Breakdown</h2>
        <div className="space-y-4">
          {contributionData.map((contrib, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold">{contrib.contributor}</p>
                  <p className="text-xs text-gray-400">{contrib.role}</p>
                </div>
                <span className="text-lg font-bold">{contrib.percentage}%</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${contrib.percentage}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.05 }}
                  className="h-full bg-gradient-to-r from-accent to-accent-purple rounded-full"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {contrib.highlights.map((highlight, hIdx) => (
                  <span
                    key={hIdx}
                    className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

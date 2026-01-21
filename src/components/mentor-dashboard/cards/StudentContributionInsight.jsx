import React from "react";
import { motion } from "framer-motion";

export default function StudentContributionInsight({ projectId }) {
  const contributionData = {
    1: [
      { name: "Priyanshi Kapse", contribution: 35, role: "Lead" },
      { name: "Aman Raj Tiwari", contribution: 28, role: "Dev" },
      { name: "Emma Davis", contribution: 22, role: "QA" },
      { name: "Raj Patel", contribution: 15, role: "Design" },
    ],
    2: [
      { name: "Priyanshi Kapse", contribution: 40, role: "Lead" },
      { name: "Aman Raj Tiwari", contribution: 32, role: "Dev" },
      { name: "Raj Patel", contribution: 28, role: "Design" },
    ],
    default: [
      { name: "Priyanshi Kapse", contribution: 35, role: "Lead" },
      { name: "Aman Raj Tiwari", contribution: 28, role: "Dev" },
      { name: "Emma Davis", contribution: 22, role: "QA" },
      { name: "Raj Patel", contribution: 15, role: "Design" },
    ],
  };

  const data = contributionData[projectId] || contributionData.default;
  const total = data.reduce((sum, item) => sum + item.contribution, 0);

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="glass-effect rounded-xl p-6 border border-white/10 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-2">Contributions</h3>
      <p className="text-sm text-gray-400 mb-6">
        {projectId ? "Project breakdown" : "Select a project"}
      </p>

      <motion.div className="space-y-4">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-400">{item.role}</p>
              </div>
              <p className="text-sm font-bold text-accent">
                {item.contribution}%
              </p>
            </div>

            {/* Contribution Bar */}
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent-purple"
                initial={{ width: 0 }}
                animate={{
                  width: `${(item.contribution / 100) * 100}%`,
                }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Inactivity Alert */}
      {data.some((item) => item.contribution < 20) && (
        <motion.div
          className="mt-6 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-orange-400">
            ⚠️ Low activity detected. Follow up with Raj Patel.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

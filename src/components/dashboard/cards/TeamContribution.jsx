import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function TeamContribution() {
  const teamMembers = [
    {
      name: "You",
      role: "Team Lead",
      contribution: 35,
      avatar: "PK",
      color: "from-accent-purple to-accent-blue",
    },
    {
      name: "Aman Raj Tiwari",
      role: "Developer",
      contribution: 28,
      avatar: "ART",
      color: "from-accent to-accent-purple",
    },
    {
      name: "Priyanshi Kapse",
      role: "Designer",
      contribution: 22,
      avatar: "PK",
      color: "from-accent-blue to-accent",
    },
    {
      name: "Emma Davis",
      role: "QA",
      contribution: 15,
      avatar: "ED",
      color: "from-accent-purple to-accent-blue",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="glass-effect rounded-2xl p-6 border border-white/10 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Team Contribution</h3>
        <div className="p-2 rounded-lg bg-accent/10">
          <TrendingUp className="w-4 h-4 text-accent" />
        </div>
      </div>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {teamMembers.map((member, idx) => (
          <motion.div
            key={member.name}
            variants={itemVariants}
            className="group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${member.color} flex items-center justify-center text-xs font-bold text-white`}
                whileHover={{ scale: 1.1 }}
              >
                {member.avatar}
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{member.name}</p>
                <p className="text-xs text-gray-400">{member.role}</p>
              </div>
              <motion.span
                className="text-sm font-bold text-accent whitespace-nowrap"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.08 }}
              >
                {member.contribution}%
              </motion.span>
            </div>

            {/* Progress Ring */}
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${member.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${member.contribution}%` }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.1 + idx * 0.08,
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Total */}
      <motion.div
        className="mt-6 pt-6 border-t border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">Total Team Effort</p>
          <p className="text-lg font-bold text-accent">100%</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

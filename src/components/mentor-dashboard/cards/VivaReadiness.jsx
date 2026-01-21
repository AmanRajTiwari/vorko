import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle, Trophy, ChevronRight } from "lucide-react";

export default function VivaReadiness() {
  const navigate = useNavigate();
  const vivaProjects = [
    {
      id: 1,
      name: "AI Chatbot",
      readiness: 85,
      status: "ready",
      missingItems: 1,
    },
    {
      id: 2,
      name: "Database Design",
      readiness: 60,
      status: "in-progress",
      missingItems: 3,
    },
    {
      id: 3,
      name: "Web App Frontend",
      readiness: 95,
      status: "ready",
      missingItems: 0,
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
      <h3 className="text-xl font-bold mb-6">Viva Readiness</h3>

      <motion.div className="space-y-4">
        {vivaProjects.map((project, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 flex-1">
                <h4 className="text-sm font-medium">{project.name}</h4>
                {project.status === "ready" && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </motion.div>
                )}
                {project.status === "in-progress" && (
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <span className="text-sm font-bold text-accent">
                {project.readiness}%
              </span>
            </div>

            {/* Readiness Bar */}
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
              <motion.div
                className={`h-full ${
                  project.readiness >= 80
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : project.readiness >= 60
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                    : "bg-gradient-to-r from-red-500 to-orange-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${project.readiness}%` }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
              />
            </div>

            {/* Missing Items */}
            {project.missingItems > 0 && (
              <p className="text-xs text-gray-400">
                {project.missingItems} item{project.missingItems > 1 ? "s" : ""}{" "}
                missing
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        onClick={() => navigate("/mentor/viva-readiness")}
        className="w-full mt-6 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 rounded-lg text-sm font-medium text-green-400 transition-colors flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Trophy className="w-4 h-4" />
        View All Projects
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

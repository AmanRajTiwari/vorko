import React, { useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../../../context/DataContext";
import { CheckCircle2, Circle, Zap, Award, AlertCircle } from "lucide-react";
import MentorLayout from "../MentorLayout";

function VivaReadinessCard({ project, vivaData, onGenerateSummary }) {
  const [expanding, setExpanding] = useState(false);

  const readinessLevel =
    vivaData.readinessScore >= 80
      ? "Ready"
      : vivaData.readinessScore >= 60
      ? "Almost Ready"
      : "In Progress";

  const readinessColor =
    vivaData.readinessScore >= 80
      ? "text-green-400"
      : vivaData.readinessScore >= 60
      ? "text-yellow-400"
      : "text-red-400";

  const completedItems = vivaData.checklist.filter(
    (item) => item.completed
  ).length;
  const totalItems = vivaData.checklist.length;

  return (
    <motion.div
      className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold mb-1">{project.name}</h3>
          <p className="text-sm text-gray-400">{project.category}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Readiness</p>
          <p className={`text-3xl font-bold ${readinessColor}`}>
            {vivaData.readinessScore}%
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 pb-4 border-b border-white/10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">
            {completedItems} of {totalItems} items completed
          </span>
          <span className={`text-xs font-semibold ${readinessColor}`}>
            {readinessLevel}
          </span>
        </div>
        <motion.div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <motion.div
            className={`h-full ${
              vivaData.readinessScore >= 80
                ? "bg-gradient-to-r from-green-500 to-green-400"
                : vivaData.readinessScore >= 60
                ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                : "bg-gradient-to-r from-red-500 to-red-400"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${vivaData.readinessScore}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>
      </div>

      {/* Checklist Preview */}
      <div className="mb-4 pb-4 border-b border-white/10">
        <h4 className="text-sm font-semibold mb-3">Readiness Checklist</h4>
        <div className="space-y-2">
          {vivaData.checklist.slice(0, 3).map((item) => (
            <motion.div
              key={item.id}
              className="flex items-center gap-2"
              whileHover={{ x: 4 }}
            >
              {item.completed ? (
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-gray-500 flex-shrink-0" />
              )}
              <span
                className={`text-sm ${
                  item.completed ? "line-through text-gray-500" : "text-white"
                }`}
              >
                {item.item}
              </span>
            </motion.div>
          ))}
          {vivaData.checklist.length > 3 && (
            <p className="text-xs text-gray-400 mt-2">
              +{vivaData.checklist.length - 3} more items
            </p>
          )}
        </div>
      </div>

      {/* Estimated Ready Date */}
      <div className="mb-4 pb-4 border-b border-white/10">
        <p className="text-xs text-gray-500 mb-1">Estimated Ready Date</p>
        <p className="text-sm font-semibold">
          {new Date(vivaData.estimatedReadyDate).toLocaleDateString()}
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <motion.button
          onClick={() => setExpanding(!expanding)}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AlertCircle className="w-4 h-4" />
          View Full Checklist
        </motion.button>
        <motion.button
          onClick={() => onGenerateSummary(project.id)}
          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Zap className="w-4 h-4" />
          Generate Summary
        </motion.button>
      </div>

      {/* Expanded Checklist Modal */}
      {expanding && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setExpanding(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-dark border border-white/10 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-b from-dark/95 to-dark/80 border-b border-white/10 p-6 flex items-center justify-between">
              <h3 className="text-lg font-bold">{project.name}</h3>
              <motion.button
                onClick={() => setExpanding(false)}
                className="text-gray-400 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ✕
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Score */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded p-4 text-center"
              >
                <p className="text-sm text-gray-400 mb-2">
                  Overall Readiness Score
                </p>
                <motion.p
                  className={`text-4xl font-bold ${readinessColor}`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  {vivaData.readinessScore}%
                </motion.p>
              </motion.div>

              {/* Full Checklist */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="text-lg font-semibold mb-4">
                  Complete Checklist
                </h4>
                <div className="space-y-3">
                  {vivaData.checklist.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded hover:bg-white/5 transition-colors cursor-pointer"
                      whileHover={{ x: 4 }}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                      <span
                        className={`flex-1 ${
                          item.completed
                            ? "line-through text-gray-500"
                            : "text-white"
                        }`}
                      >
                        {item.item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-500/10 border border-blue-500/30 rounded p-4"
              >
                <h4 className="text-sm font-semibold text-blue-300 mb-3">
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {vivaData.recommendations.map((rec, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-blue-200 flex items-start gap-2"
                    >
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Ready Date */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 border border-white/10 rounded p-4"
              >
                <p className="text-xs text-gray-500 mb-2">
                  Estimated Ready for Viva
                </p>
                <p className="text-lg font-semibold">
                  {new Date(vivaData.estimatedReadyDate).toLocaleDateString()}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function VivaReadinessPage() {
  const { projects, getVivaData, generateVivaSummary } = useData();

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

  // Calculate overall readiness stats
  const readinessStats = projects.map((p) => ({
    projectId: p.id,
    score: getVivaData(p.id)?.readinessScore || 0,
  }));

  const averageReadiness = Math.round(
    readinessStats.reduce((sum, s) => sum + s.score, 0) / readinessStats.length
  );

  const readyProjects = readinessStats.filter((s) => s.score >= 80).length;

  return (
    <MentorLayout
      pageTitle="Viva Readiness"
      pageDescription="Track and manage project viva readiness status"
    >
      {/* Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-400 text-sm">Total Projects</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">
            {projects.length}
          </p>
        </motion.div>
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-400 text-sm">Ready for Viva</p>
          <p className="text-3xl font-bold text-green-400 mt-2">
            {readyProjects}
          </p>
        </motion.div>
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-400 text-sm">Average Readiness</p>
          <p className="text-3xl font-bold text-purple-400 mt-2">
            {averageReadiness}%
          </p>
        </motion.div>
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-400 text-sm">In Progress</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">
            {projects.length - readyProjects}
          </p>
        </motion.div>
      </motion.div>

      {/* Project Readiness Cards */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => {
          const vivaData = getVivaData(project.id);
          return (
            vivaData && (
              <motion.div key={project.id} variants={itemVariants}>
                <VivaReadinessCard
                  project={project}
                  vivaData={vivaData}
                  onGenerateSummary={generateVivaSummary}
                />
              </motion.div>
            )
          );
        })}
      </motion.div>
    </MentorLayout>
  );
}

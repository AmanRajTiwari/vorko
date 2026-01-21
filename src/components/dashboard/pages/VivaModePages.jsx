import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { StudentDataContext } from "../../../context/StudentContext";

export default function VivaModePages() {
  const { vivaData, activeProject } = useContext(StudentDataContext);
  const [selectedTab, setSelectedTab] = useState("readiness");

  const tabs = [
    { id: "readiness", label: "Readiness", icon: Zap },
    { id: "timeline", label: "Timeline", icon: Calendar },
    { id: "contributions", label: "Contributions", icon: Users },
  ];

  const getCompletionStatus = (key) => {
    const status = vivaData.completionStatus[key];
    return status ? status.percentage : 0;
  };

  return (
    <div className="min-h-screen p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-bold">Viva Mode</h1>
        <p className="text-gray-400">
          Professional viva preparation and evidence dashboard.
        </p>
      </motion.div>

      {/* Viva Header Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-effect p-8 rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 to-accent-purple/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-sm text-gray-400 mb-2">Project</p>
            <p className="text-2xl font-bold">{activeProject?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-2">Readiness Score</p>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-accent">
                {vivaData.readinessScore}%
              </p>
              <div className="w-32 h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${vivaData.readinessScore}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-accent to-accent-purple"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-2">Estimated Viva Date</p>
            <p className="text-2xl font-bold">{vivaData.estimatedDate}</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                selectedTab === tab.id
                  ? "text-accent border-b-2 border-accent"
                  : "text-gray-400 border-b-2 border-transparent hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      {selectedTab === "readiness" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(vivaData.completionStatus).map(
              ([key, value], idx) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-effect p-4 rounded-xl border border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    {value.completed ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <Clock size={20} className="text-yellow-400" />
                    )}
                  </div>
                  <p className="text-2xl font-bold mb-2">{value.percentage}%</p>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value.percentage}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-accent to-accent-purple"
                    />
                  </div>
                </motion.div>
              )
            )}
          </div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-effect p-6 rounded-xl border border-white/10"
          >
            <h3 className="text-lg font-bold mb-4">
              Viva Preparation Checklist
            </h3>
            <div className="space-y-3">
              {[
                "Complete all project documentation",
                "Practice explaining architecture decisions",
                "Prepare demo walkthrough",
                "Review code quality and best practices",
                "Prepare for common technical questions",
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <input
                    type="checkbox"
                    defaultChecked={idx < 2}
                    className="w-4 h-4 rounded accent-accent cursor-pointer"
                  />
                  <span className="text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {selectedTab === "timeline" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            {vivaData.timeline.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-6"
              >
                {/* Timeline Line */}
                <div className="relative flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-accent to-accent-purple ring-4 ring-dark" />
                  {idx < vivaData.timeline.length - 1 && (
                    <div className="w-1 h-24 bg-gradient-to-b from-accent/50 to-transparent mt-2" />
                  )}
                </div>

                {/* Event Content */}
                <motion.div
                  className="glass-effect p-6 rounded-xl border border-white/10 flex-1 hover:border-white/20 transition-all"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">{event.event}</h3>
                    <span className="text-xs text-gray-400">{event.date}</span>
                  </div>
                  <p className="text-sm text-accent mb-2">
                    {event.contributor}
                  </p>
                  <p className="text-gray-400 text-sm">{event.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {selectedTab === "contributions" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {vivaData.contributionProof.map((contrib, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-effect p-6 rounded-xl border border-white/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{contrib.contributor}</h3>
                  <p className="text-sm text-accent">{contrib.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{contrib.percentage}%</p>
                  <p className="text-xs text-gray-400">
                    {contrib.commits} commits
                  </p>
                </div>
              </div>

              {/* Contribution Bar */}
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${contrib.percentage}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-accent to-accent-purple"
                />
              </div>

              {/* Highlights */}
              <div>
                <p className="text-xs text-gray-400 mb-2">Key Contributions</p>
                <div className="flex flex-wrap gap-2">
                  {contrib.highlights.map((highlight, hIdx) => (
                    <span
                      key={hIdx}
                      className="text-xs px-3 py-1 rounded-full bg-accent/20 text-accent font-semibold"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

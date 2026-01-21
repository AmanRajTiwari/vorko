import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export default function ContributionHeatmap() {
  // Mock contribution data - last 12 weeks
  const generateContributions = () => {
    const data = [];
    for (let i = 0; i < 84; i++) {
      data.push(Math.floor(Math.random() * 5));
    }
    return data;
  };

  const contributions = useMemo(() => generateContributions(), []);

  // Get intensity color based on contribution level
  const getIntensityColor = (level) => {
    switch (level) {
      case 0:
        return "bg-white/5 hover:bg-white/10";
      case 1:
        return "bg-accent/20 hover:bg-accent/30";
      case 2:
        return "bg-accent/40 hover:bg-accent/50";
      case 3:
        return "bg-accent/60 hover:bg-accent/70";
      case 4:
        return "bg-accent hover:bg-accent-purple";
      default:
        return "bg-white/5";
    }
  };

  const weeks = useMemo(() => {
    const w = [];
    for (let i = 0; i < 12; i++) {
      w.push({
        week: i + 1,
        days: contributions.slice(i * 7, (i + 1) * 7),
      });
    }
    return w;
  }, [contributions]);

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totalContributions = contributions.reduce((a, b) => a + b, 0);
  const streak = 5; // Mock streak

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="glass-effect rounded-2xl p-6 border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-accent to-accent-purple rounded-full" />
          <h3 className="text-lg font-bold">Contribution Activity</h3>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-orange-400/10 border border-orange-400/30"
        >
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-medium text-orange-100">
            {streak} day streak
          </span>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <p className="text-xs text-gray-400 mb-1">Total Contributions</p>
          <p className="text-xl font-bold">{totalContributions}</p>
        </div>
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <p className="text-xs text-gray-400 mb-1">Average Per Day</p>
          <p className="text-xl font-bold">
            {(totalContributions / 84).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Heatmap */}
      <div className="space-y-2 overflow-x-auto pb-2">
        {/* Day labels */}
        <div className="flex items-center gap-1">
          <div className="w-8 flex-shrink-0" />
          <div className="flex gap-1">
            {dayLabels.map((day) => (
              <div key={day} className="w-6 text-center">
                <span className="text-xs text-gray-500">{day[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap grid */}
        <motion.div
          className="space-y-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {weeks.map((week) => (
            <motion.div
              key={`week-${week.week}`}
              className="flex items-center gap-1"
              variants={itemVariants}
            >
              <div className="w-8 flex-shrink-0">
                <span className="text-xs text-gray-500">W{week.week}</span>
              </div>
              <div className="flex gap-1">
                {week.days.map((level, dayIdx) => (
                  <motion.div
                    key={`${week.week}-${dayIdx}`}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    className={`w-6 h-6 rounded-sm border border-white/10 cursor-pointer group transition-all ${getIntensityColor(
                      level
                    )}`}
                    title={`${level} contribution${level !== 1 ? "s" : ""}`}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-dark rounded text-xs whitespace-nowrap pointer-events-none transition-opacity">
                      {level} contribution{level !== 1 ? "s" : ""}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-gray-400">Activity</span>
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className="flex items-center gap-1">
              <div
                className={`w-3 h-3 rounded-sm ${
                  getIntensityColor(level).split(" ")[0]
                }`}
              />
              {level === 4 && (
                <span className="text-xs text-gray-400">More</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

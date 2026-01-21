import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, X, Play, Pause } from "lucide-react";

export default function FocusMode() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [totalTime] = useState(25 * 60);

  // Mock today's tasks
  const todaysTasks = [
    { id: 1, title: "Implement authentication", status: "in-progress" },
    { id: 2, title: "Design dashboard layout", status: "todo" },
    { id: 3, title: "Create database schema", status: "todo" },
    { id: 4, title: "Review mentor feedback", status: "todo" },
  ];

  // Timer effect
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const isTimeUp = timeLeft === 0;

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
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
          <h3 className="text-lg font-bold">Focus Mode</h3>
        </div>
        {isTimeUp && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-2 py-1 rounded-md bg-green-400/20 text-green-300 text-xs font-medium"
          >
            Session Complete! 🎉
          </motion.div>
        )}
      </div>

      {/* Timer Display */}
      <motion.div
        className="relative w-48 h-48 mx-auto mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Circular Progress */}
        <svg
          className="absolute inset-0 transform -rotate-90"
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#timerGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * 283} 283`}
            animate={{ strokeDasharray: [`${(progress / 100) * 283} 283`] }}
            transition={{ duration: 0.5 }}
          />
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%">
              <stop offset="0%" stopColor="#00d9ff" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            key={timeLeft}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            <div className="text-5xl font-bold tracking-wider">
              {formatTime(timeLeft)}
            </div>
            <p className="text-xs text-gray-400 mt-2">Pomodoro Timer</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex justify-center gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsActive(!isActive)}
          className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
            isActive
              ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
              : "bg-accent/20 text-accent hover:bg-accent/30"
          }`}
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Start
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="px-6 py-2 rounded-lg font-medium flex items-center gap-2 bg-white/10 text-gray-300 hover:bg-white/20 transition-all"
        >
          <X className="w-4 h-4" />
          Reset
        </motion.button>
      </div>

      {/* Tasks List */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <p className="text-sm font-semibold text-gray-300 mb-3">
          Today's Tasks
        </p>

        <motion.div
          className="space-y-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {todaysTasks.map((task, idx) => (
            <motion.div
              key={task.id}
              variants={itemVariants}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  task.status === "done"
                    ? "bg-green-400 border-green-400"
                    : task.status === "in-progress"
                    ? "border-accent bg-accent/20"
                    : "border-white/30"
                }`}
              >
                {task.status === "done" && (
                  <CheckCircle2 className="w-3 h-3 text-white" />
                )}
              </motion.div>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm truncate ${
                    task.status === "done"
                      ? "text-gray-500 line-through"
                      : task.status === "in-progress"
                      ? "text-accent font-medium"
                      : "text-gray-300"
                  }`}
                >
                  {task.title}
                </p>
              </div>

              {task.status === "in-progress" && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 rounded-full bg-accent flex-shrink-0"
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        <p className="text-xs text-gray-500 mt-3">
          {todaysTasks.filter((t) => t.status === "done").length} of{" "}
          {todaysTasks.length} tasks completed
        </p>
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 p-3 rounded-lg bg-blue-400/10 border border-blue-400/30 text-xs text-blue-200"
      >
        💡 Pro tip: Use Pomodoro intervals for deep focus sessions.
      </motion.div>
    </motion.div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

export default function Problem() {
  const { ref, isInView } = useInView();

  const problems = [
    {
      title: "Scattered Communication",
      description:
        "No central place for team discussions, feedback, and updates. Everyone's lost in emails.",
    },
    {
      title: "Hidden Contributions",
      description:
        "Hard to track who did what. Credit goes to visible people, hidden work gets forgotten.",
    },
    {
      title: "No Transparency",
      description:
        "Mentors lack visibility into actual progress. Viva preparation is last-minute panic.",
    },
    {
      title: "Lost Data",
      description:
        "Meeting notes, decisions, and milestones scattered across apps. Nothing in one place.",
    },
  ];

  const solutions = [
    "Unified workspace for all collaboration",
    "Complete contribution tracking & analytics",
    "Real-time transparency for mentors",
    "Auto-generated viva-ready reports",
  ];

  return (
    <section
      id="features"
      ref={ref}
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">The Problem</span> with Traditional
            Project Management
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            College projects deserve better tools than scattered spreadsheets
            and forgotten feedback.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Problems */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {problems.map((problem, idx) => (
              <motion.div
                key={idx}
                className="glass-effect p-4 rounded-lg hover:bg-white/10 transition-all group cursor-pointer"
                whileHover={{ x: 10 }}
              >
                <h3 className="font-semibold text-white mb-2 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  {problem.title}
                </h3>
                <p className="text-gray-400 text-sm">{problem.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold mb-6 text-accent">
              Vorko Solves This
            </h3>
            {solutions.map((solution, idx) => (
              <motion.div
                key={idx}
                className="glass-effect bg-gradient-to-r from-accent/10 to-accent-purple/10 p-4 rounded-lg hover:from-accent/20 hover:to-accent-purple/20 transition-all group cursor-pointer"
                whileHover={{ x: -10 }}
              >
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                    <svg
                      className="w-4 h-4 text-dark"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-200 font-medium">{solution}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

export default function MentorViva() {
  const { ref, isInView } = useInView();

  const reportSections = [
    { title: "Project Overview", icon: "📋" },
    { title: "Team Contributions", icon: "👥" },
    { title: "Timeline & Milestones", icon: "📅" },
    { title: "Meetings & Feedback", icon: "💬" },
    { title: "Technical Details", icon: "⚙️" },
    { title: "Results & Impact", icon: "🎯" },
  ];

  const mentorBenefits = [
    "Real-time project visibility",
    "Track individual contributions",
    "Provide structured feedback",
    "Monitor team progress",
    "Identify risks early",
    "Generate evaluation reports",
  ];

  return (
    <section
      id="reports"
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
            <span className="gradient-text">Mentor & Viva Mode</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything mentors need to guide their teams and students need to
            ace their viva.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Mentor Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">
              For Mentors
            </h3>
            <div className="space-y-4">
              {mentorBenefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  className="glass-effect p-4 rounded-lg hover:bg-white/10 transition-all group"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-accent flex items-center justify-center mr-4 flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-dark"
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
                    <p className="text-gray-200 font-medium">{benefit}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Viva Report Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">
              Viva-Ready Reports
            </h3>
            <motion.div className="glass-effect p-8 rounded-xl border border-white/10 shadow-lg">
              <div className="space-y-4">
                {reportSections.map((section, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all group cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-2xl mr-3">{section.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-white group-hover:text-accent transition-colors">
                        {section.title}
                      </h4>
                    </div>
                    <svg
                      className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>

              {/* Report Stats */}
              <motion.div
                className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    Report Pages
                  </p>
                  <p className="text-2xl font-bold text-accent">15+</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    Export Formats
                  </p>
                  <p className="text-2xl font-bold text-accent-purple">
                    PDF, DOCX
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-effect p-8 rounded-xl border border-accent/20 bg-gradient-to-r from-accent/5 to-accent-purple/5"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center flex-shrink-0">
              <svg
                className="w-8 h-8 text-dark"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 1 1 0 000 2H3a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V6a1 1 0 00-1-1h3a1 1 0 000-2 2 2 0 00-2 2v12a2 2 0 01-2-2V5a1 1 0 10-2 0v6a1 1 0 11-2 0V5a1 1 0 10-2 0v6a1 1 0 11-2 0V5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">
                One-Click Report Generation
              </h4>
              <p className="text-gray-300">
                Generate professional, comprehensive viva reports with a single
                click. Includes metrics, timelines, contributions, and mentor
                feedback.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

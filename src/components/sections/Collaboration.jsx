import React from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

export default function Collaboration() {
  const { ref, isInView } = useInView();

  const roles = [
    {
      role: "Team Lead",
      responsibilities: ["Assign tasks", "Monitor progress", "Lead meetings"],
      color: "from-accent to-cyan-400",
      lightColor: "bg-accent/20",
    },
    {
      role: "Team Member",
      responsibilities: ["Complete tasks", "Share updates", "Collaborate"],
      color: "from-accent-purple to-pink-400",
      lightColor: "bg-accent-purple/20",
    },
    {
      role: "Mentor",
      responsibilities: ["Review work", "Provide feedback", "Guide team"],
      color: "from-accent-blue to-blue-400",
      lightColor: "bg-accent-blue/20",
    },
  ];

  const features = [
    {
      title: "Real-time Collaboration",
      description: "Work together synchronously with live updates",
    },
    {
      title: "Contribution Tracking",
      description: "Every action is logged and attributed accurately",
    },
    {
      title: "Permission Management",
      description: "Control who sees and edits what",
    },
    {
      title: "Activity Feed",
      description: "Never miss important updates or changes",
    },
  ];

  return (
    <section
      id="mentors"
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
            <span className="gradient-text">Collaboration & Transparency</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everyone knows what's happening, who's doing what, and why it
            matters.
          </p>
        </motion.div>

        {/* Team Roles */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {roles.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <motion.div
                className={`glass-effect p-6 rounded-xl h-full hover:bg-white/10 transition-all`}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`w-12 h-12 rounded-lg ${item.lightColor} flex items-center justify-center mb-4`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} opacity-20`}
                  ></div>
                </div>
                <h3
                  className={`text-xl font-bold mb-3 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                >
                  {item.role}
                </h3>
                <ul className="space-y-2">
                  {item.responsibilities.map((resp, i) => (
                    <li
                      key={i}
                      className="flex items-center text-gray-400 text-sm"
                    >
                      <span className="w-1 h-1 bg-accent rounded-full mr-2"></span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="glass-effect p-4 rounded-lg hover:bg-white/10 transition-all group"
              whileHover={{ y: -3 }}
            >
              <h4 className="font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                {feature.title}
              </h4>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Large Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-effect p-8 rounded-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg mb-4">Team Structure</h4>
              {["Lead", "Designer", "Developer", "QA"].map((member, idx) => (
                <motion.div
                  key={idx}
                  className="p-3 glass-effect-sm rounded-lg text-sm flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  {member}
                </motion.div>
              ))}
            </div>

            {/* Center */}
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-dark"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v2a2 2 0 002 2h4a2 2 0 002-2v-2zM2 15a4 4 0 008 0v2a2 2 0 00-2 2H4a2 2 0 00-2-2v-2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-400">Full Team Visibility</p>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg mb-4">Contribution Metrics</h4>
              {[
                { label: "Tasks Done", value: "24/28" },
                { label: "Meetings Attended", value: "12/12" },
                { label: "Progress", value: "92%" },
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  className="p-3 glass-effect-sm rounded-lg"
                  whileHover={{ x: -5 }}
                >
                  <div className="text-xs text-gray-400 mb-1">
                    {metric.label}
                  </div>
                  <div className="text-lg font-bold text-accent">
                    {metric.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

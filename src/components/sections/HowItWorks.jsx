import React from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

export default function HowItWorks() {
  const { ref, isInView } = useInView();

  const steps = [
    {
      number: "1",
      title: "Create Your Project",
      description:
        "Set up your team workspace with roles, milestones, and deadlines. Invite team members and mentors.",
      icon: "🚀",
    },
    {
      number: "2",
      title: "Collaborate & Track",
      description:
        "Create tasks, schedule meetings, share updates. Every contribution is automatically tracked.",
      icon: "👥",
    },
    {
      number: "3",
      title: "Get Feedback",
      description:
        "Mentors review progress, provide feedback, and guide your team in real-time.",
      icon: "💡",
    },
    {
      number: "4",
      title: "Generate Reports",
      description:
        "Auto-generate comprehensive viva reports with metrics, timelines, and contributions.",
      icon: "📊",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="how-it-works"
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
            <span className="gradient-text">How Vorko Works</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Simple, intuitive workflow from project kickoff to viva success.
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {steps.map((step, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <motion.div
                className="glass-effect p-6 rounded-xl h-full hover:bg-white/10 transition-all group cursor-pointer relative"
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 217, 255, 0.1)",
                }}
              >
                {/* Step Number Circle */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center font-bold text-dark text-lg shadow-glow">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-5xl mb-4 mt-2">{step.icon}</div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Connector Line */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-1 bg-gradient-to-r from-accent to-transparent"></div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Line Animation */}
        <div className="relative mt-12 h-1 bg-dark-lighter rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-accent-purple rounded-full"
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          ></motion.div>
        </div>
      </div>
    </section>
  );
}

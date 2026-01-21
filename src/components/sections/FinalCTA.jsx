import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useInView } from "../hooks/useInView";

export default function FinalCTA() {
  const navigate = useNavigate();
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative glass-effect p-12 sm:p-16 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-accent-purple/5 to-accent-blue/10 overflow-hidden"
        >
          {/* Animated Background Elements */}
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-accent/30 to-transparent rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          ></motion.div>
          <motion.div
            className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-accent-purple/30 to-transparent rounded-full blur-3xl"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          ></motion.div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Ready to Transform Your{" "}
                <span className="gradient-text">Project?</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                Join hundreds of students and mentors already collaborating on
                Vorko. From idea to viva success in one platform.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                className="px-10 py-4 rounded-lg font-bold text-lg bg-gradient-to-r from-accent to-accent-purple text-dark shadow-glow hover:shadow-xl transition-shadow relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/mentor/dashboard")}
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                ></motion.span>
                <span className="relative">Get Started Free</span>
              </motion.button>

              <motion.button
                className="px-10 py-4 rounded-lg font-bold text-lg glass-effect text-white hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/mentor/dashboard")}
              >
                Book a Demo
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20"></div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Free for teams up to 10</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20"></div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

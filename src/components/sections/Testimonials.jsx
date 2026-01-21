import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";

export default function Testimonials() {
  const { ref, isInView } = useInView();
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      name: "Aisha Patel",
      role: "CS Major, IIT Delhi",
      text: "Vorko transformed how our team collaborated. Everything was visible, from who did what to the feedback from mentors. Our viva prep was stress-free because we had all the data.",
      avatar: "👩‍💼",
    },
    {
      name: "Raj Kumar",
      role: "Mentor, BITS Pilani",
      text: "As a mentor, I can finally see real project progress without asking for updates. The transparency is incredible. Students are more accountable, and viva evaluations are more fair.",
      avatar: "👨‍🏫",
    },
    {
      name: "Zara Ahmed",
      role: "Product Lead, Delhi University",
      text: "The reports are lifesavers. Instead of hunting down information before viva, everything is auto-generated and professional. We look prepared and polished.",
      avatar: "👩‍💻",
    },
    {
      name: "Arjun Singh",
      role: "Team Lead, VIT University",
      text: "Contribution tracking finally gives credit where it's due. No more invisible work. Everyone knows their impact on the project.",
      avatar: "👨‍💻",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Loved by Students & Mentors</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See how Vorko is changing project collaboration across universities.
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.4, delay: 0.05 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="glass-effect p-8 sm:p-12 rounded-xl relative min-h-72 transform-gpu">
            <div className="absolute top-6 left-6 text-5xl opacity-20 pointer-events-none">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.028-2.26-6.5-2-.5 0-1 .5-1 1.972V11c0 1-1 2-1 2s1.032.6 1 2c0 1-1 2-1 2s1.5 1 1 2 1 2-1 2-4.519-1.5-4.519-11V5c0-1 0-1 1-1z" />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl sm:text-2xl text-gray-200 mb-8 leading-relaxed">
                  "{testimonials[current].text}"
                </p>

                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-3xl mr-4 flex-shrink-0 transform-gpu">
                    {testimonials[current].avatar}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Carousel Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center items-center gap-3 mb-12"
        >
          {testimonials.map((_, idx) => (
            <motion.button
              key={idx}
              className={`h-3 rounded-full transition-all ${
                idx === current
                  ? "w-8 bg-gradient-to-r from-accent to-accent-purple"
                  : "w-3 bg-white/20 hover:bg-white/40"
              }`}
              onClick={() => setCurrent(idx)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>

        {/* Small Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { icon: "⭐", text: "4.9/5 Rating", subtext: "500+ users" },
            { icon: "🚀", text: "50+ Universities", subtext: "Growing daily" },
            { icon: "📈", text: "10k+ Students", subtext: "Collaborating" },
            { icon: "👍", text: "98% Satisfaction", subtext: "Very happy" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="glass-effect p-4 rounded-lg text-center hover:bg-white/10 transition-colors transform-gpu"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.2 + idx * 0.02 }}
              whileHover={{ y: -2 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <h4 className="font-bold text-white mb-1">{stat.text}</h4>
              <p className="text-xs text-gray-400">{stat.subtext}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

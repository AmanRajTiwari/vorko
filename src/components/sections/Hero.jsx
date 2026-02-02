import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero({ onNavigate }) {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [buttonMagnet, setButtonMagnet] = useState({
    primary: { x: 0, y: 0 },
    secondary: { x: 0, y: 0 },
  });
  const vivaParallaxX = useMotionValue(0);
  const vivaParallaxY = useMotionValue(0);
  const ticking = useRef(false);
  const magnetTicking = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Debug: Log parallax changes
  useEffect(() => {
    console.log(
      "vivaParallaxX:",
      vivaParallaxX.get(),
      "vivaParallaxY:",
      vivaParallaxY.get(),
    );
  }, []);

  const handleMouseMove = (e) => {
    console.log("handleMouseMove called");
    // Skip on mobile
    if (isMobile) return;

    // Early return if section ref is not set
    if (!sectionRef.current) return;

    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        // Get the section element from ref or find it
        const section = sectionRef.current;
        if (!section) {
          console.log("Section ref not found");
          return;
        }

        const { clientX, clientY } = e;
        const { left, top, width, height } = section.getBoundingClientRect();
        console.log("Mouse position:", { clientX, clientY });
        console.log("Section rect:", { left, top, width, height });
        const x = (clientX - left - width / 2) / 30;
        const y = (clientY - top - height / 2) / 30;
        setMousePosition({ x, y });

        // Parallax for Viva text (max 4px)
        const parallaxX = ((clientX - left - width / 2) / width) * 4;
        const parallaxY = ((clientY - top - height / 2) / height) * 4;
        console.log("Calculated parallax:", { parallaxX, parallaxY });
        vivaParallaxX.set(parallaxX);
        vivaParallaxY.set(parallaxY);

        ticking.current = false;
      });
      ticking.current = true;
    }
  };

  const handleCTAMouseMove = (e, buttonType) => {
    if (isMobile) return;

    if (!magnetTicking.current) {
      window.requestAnimationFrame(() => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;

        const distance = Math.sqrt(distX * distX + distY * distY);
        const maxDistance = 100;

        if (distance < maxDistance) {
          const strength = (1 - distance / maxDistance) * 0.3;
          const magnetX = (distX / distance) * strength * 20;
          const magnetY = (distY / distance) * strength * 20;

          setButtonMagnet((prev) => ({
            ...prev,
            [buttonType]: { x: magnetX, y: magnetY },
          }));
        }
        magnetTicking.current = false;
      });
      magnetTicking.current = true;
    }
  };

  const handleCTAMouseLeave = (buttonType) => {
    setButtonMagnet((prev) => ({
      ...prev,
      [buttonType]: { x: 0, y: 0 },
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Headline word animation variants - Enhanced tagline words
  const fromWordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const ideaWordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const toWordVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const vivaWordVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.45,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Glow animation for "Idea"
  const ideaGlowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 0.6, 0],
      transition: {
        delay: 0.15,
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  // Underline animation - draws left to right
  const underlineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        delay: 0.7,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Gradient pulse for Viva
  const vivaPulseVariants = {
    hidden: {},
    visible: {
      transition: {
        delay: 0.45,
        staggerChildren: 0.1,
      },
    },
  };

  // Tagline animation
  const taglineVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.0,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-8, 8, -8],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const cardEntryVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: (delay) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 1 + delay,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-visible min-h-screen flex items-center"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Headline - Enhanced Animated Tagline */}
          <motion.div
            className="text-center mb-8"
            initial="hidden"
            animate="visible"
          >
            {/* Premium Animated Tagline */}
            <div style={{ overflow: "visible" }}>
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
                style={{ overflow: "visible" }}
              >
                <span className="inline-block mr-3">
                  <motion.span
                    className="inline-block glow-text"
                    variants={fromWordVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    From
                  </motion.span>
                </span>
                <span className="inline-block relative mr-3">
                  <motion.span
                    className="inline-block"
                    variants={ideaWordVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.span
                      className="inline-block text-accent"
                      animate={{
                        textShadow: [
                          "0 0 0px rgba(0, 217, 255, 0)",
                          "0 0 20px rgba(0, 217, 255, 0.6)",
                          "0 0 0px rgba(0, 217, 255, 0)",
                        ],
                      }}
                      transition={{
                        delay: 0.15,
                        duration: 1.2,
                        ease: "easeInOut",
                      }}
                    >
                      Idea
                    </motion.span>
                  </motion.span>
                </span>
                <span className="inline-block mr-3">
                  <motion.span
                    className="inline-block text-gray-400"
                    variants={toWordVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    to
                  </motion.span>
                </span>
                <motion.div
                  style={{
                    display: "inline-block",
                    willChange: "transform",
                    overflow: "visible",
                    x: vivaParallaxX,
                    y: vivaParallaxY,
                  }}
                >
                  <motion.span
                    className="inline-block gradient-text relative"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{
                      opacity: [1, 0.85, 1],
                      scale: 1,
                    }}
                    transition={{
                      scale: {
                        delay: 0.45,
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                      opacity: {
                        delay: 1.2,
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <motion.span
                      className="inline-block"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        delay: 1.2,
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        backgroundImage:
                          "linear-gradient(270deg, #00d9ff, #a78bfa, #3b82f6, #00d9ff)",
                        backgroundSize: "200% 200%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Viva
                    </motion.span>
                  </motion.span>
                </motion.div>
              </motion.h1>
            </div>

            {/* Animated Underline - Draws left to right with glow */}
            <motion.div className="flex justify-center mt-6 mb-4">
              <motion.div
                className="h-1 bg-gradient-to-r from-accent via-accent to-accent-purple rounded-full relative"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  delay: 0.7,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                style={{
                  width: "80px",
                  originX: 0,
                  boxShadow: "0 0 12px rgba(0, 217, 255, 0.4)",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Subheading */}
          <motion.p
            variants={taglineVariants}
            initial="hidden"
            animate="visible"
            className="text-center text-gray-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-12 sm:mb-16 leading-relaxed px-2 sm:px-0"
          >
            Collaborate seamlessly with your team, mentors, and peers. Track
            every contribution, meeting, and milestone with full transparency.
            <span className="block mt-2 text-accent">
              Ready to ace your viva.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              className="px-8 py-4 rounded-lg font-semibold bg-gradient-to-r from-accent to-accent-purple text-dark shadow-glow hover:shadow-2xl transition-shadow relative overflow-hidden group"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={{ x: buttonMagnet.primary.x, y: buttonMagnet.primary.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              onMouseMove={(e) => handleCTAMouseMove(e, "primary")}
              onMouseLeave={() => handleCTAMouseLeave("primary")}
            >
              <motion.span
                className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors"
                layoutId="buttonHover"
              ></motion.span>
              <span className="relative">Start Your Project</span>
            </motion.button>
            <motion.button
              className="px-8 py-4 rounded-lg font-semibold glass-effect text-white border border-accent/30 hover:border-accent/60 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                x: buttonMagnet.secondary.x,
                y: buttonMagnet.secondary.y,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              onMouseMove={(e) => handleCTAMouseMove(e, "secondary")}
              onMouseLeave={() => handleCTAMouseLeave("secondary")}
              onClick={() => {
                navigate("/mentor/dashboard");
              }}
            >
              See How It Works
            </motion.button>
          </motion.div>

          {/* Floating Cards - Hide on mobile, show on desktop */}
          {!isMobile && (
            <motion.div
              className="relative h-96 mx-auto max-w-4xl hidden md:block"
              animate={{
                x: mousePosition.x * 0.5,
                y: mousePosition.y * 0.5,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              {/* Tasks Card */}
              <motion.div
                className="absolute top-0 left-0 w-40 glass-effect p-4 rounded-xl shadow-lg"
                custom={0}
                initial="hidden"
                animate="visible"
                variants={cardEntryVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mb-3"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </motion.div>
                <h3 className="font-semibold text-sm mb-1">Tasks</h3>
                <p className="text-xs text-gray-400">Track all project tasks</p>
              </motion.div>

              {/* Meetings Card */}
              <motion.div
                className="absolute top-20 right-0 w-40 glass-effect p-4 rounded-xl shadow-lg"
                custom={0.15}
                initial="hidden"
                animate="visible"
                variants={cardEntryVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="w-10 h-10 bg-accent-purple/20 rounded-lg flex items-center justify-center mb-3"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <svg
                    className="w-6 h-6 text-accent-purple"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.div>
                <h3 className="font-semibold text-sm mb-1">Meetings</h3>
                <p className="text-xs text-gray-400">
                  Record & review discussions
                </p>
              </motion.div>

              {/* Mentor Reviews Card */}
              <motion.div
                className="absolute bottom-0 right-10 w-44 glass-effect p-4 rounded-xl shadow-lg"
                custom={0.3}
                initial="hidden"
                animate="visible"
                variants={cardEntryVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="w-10 h-10 bg-accent-blue/20 rounded-lg flex items-center justify-center mb-3"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <svg
                    className="w-6 h-6 text-accent-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </motion.div>
                <h3 className="font-semibold text-sm mb-1">Mentor Reviews</h3>
                <p className="text-xs text-gray-400">Feedback & guidance</p>
              </motion.div>

              {/* Central Glow Circle */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-accent/20 to-accent-purple/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              ></motion.div>
            </motion.div>
          )}

          {/* Mobile Dashboard Preview */}
          {isMobile && (
            <motion.div
              className="md:hidden mb-12 mx-auto max-w-sm"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
            >
              <div className="glass-effect rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Tasks</h4>
                    <p className="text-xs text-gray-400">
                      Track all project tasks
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="w-8 h-8 bg-accent-purple/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-accent-purple"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Meetings</h4>
                    <p className="text-xs text-gray-400">
                      Record & review discussions
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent-blue/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-accent-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Mentor Reviews</h4>
                    <p className="text-xs text-gray-400">Feedback & guidance</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Stats or Trust Indicators */}
          <motion.div
            className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            {[
              { number: "500+", label: "Active Projects" },
              { number: "50+", label: "Universities" },
              { number: "10k+", label: "Happy Students" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.8 + idx * 0.1,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold glow-text mb-2">
                  {stat.number}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

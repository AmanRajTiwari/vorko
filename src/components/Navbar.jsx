import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar({ onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const { isAuthenticated, user, role, logout } = useAuth();
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Determine scroll direction
          if (currentScrollY > lastScrollY.current) {
            setScrollDirection("down");
          } else {
            setScrollDirection("up");
          }

          lastScrollY.current = currentScrollY;
          setScrollY(currentScrollY);
          setIsScrolled(currentScrollY > 50);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Mentors", href: "#mentors" },
    { label: "Reports", href: "#reports" },
  ];

  const handleMentorDashboard = () => {
    navigate("/mentor/dashboard");
    setIsMobileOpen(false);
  };

  const handleStudentDashboard = () => {
    navigate("/student/dashboard");
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileOpen(false);
  };

  const handleSignIn = () => {
    navigate("/login");
    setIsMobileOpen(false);
  };

  // Calculate navbar height and blur based on scroll
  const navHeight = isScrolled ? "h-14" : "h-16";
  const backdropBlur = isScrolled ? "backdrop-blur-xl" : "backdrop-blur-md";
  const bgOpacity = isScrolled ? "bg-dark/40" : "bg-dark/20";
  const borderOpacity = isScrolled ? "border-white/20" : "border-white/10";

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 ${navHeight} transition-all duration-300 ${backdropBlur} ${bgOpacity} border-b ${borderOpacity}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Background glow effect on scroll */}
      {isScrolled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative z-10">
        {/* Logo - Left */}
        <motion.div
          className="flex items-center gap-2.5 cursor-pointer flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/")}
        >
          <motion.div
            className="w-9 h-9 bg-gradient-to-br from-accent to-accent-purple rounded-lg flex items-center justify-center font-bold text-dark text-sm shadow-lg"
            animate={{
              boxShadow: isScrolled
                ? "0 0 15px rgba(0, 217, 255, 0.4)"
                : "0 0 10px rgba(0, 217, 255, 0.2)",
            }}
            transition={{ duration: 0.3 }}
          >
            V
          </motion.div>
          <span className="text-lg font-bold glow-text inline">Vorko</span>
        </motion.div>

        {/* Center Navigation - Desktop Only */}
        <motion.div
          className="hidden lg:flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {navItems.map((item, idx) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-sm font-medium relative group text-gray-300 hover:text-white transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35 + idx * 0.08,
                duration: 0.4,
                ease: "easeOut",
              }}
              whileHover={{ y: -2 }}
            >
              {item.label}

              {/* Animated underline */}
              <motion.span
                className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-accent to-accent-purple rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Buttons - Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.5,
            ease: "easeOut",
          }}
          className="hidden md:flex items-center gap-3"
        >
          {isAuthenticated ? (
            <>
              {/* User Info */}
              <motion.div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <div className="text-xs font-semibold text-accent capitalize">
                    {role}
                  </div>
                  <div className="text-xs text-gray-400 truncate max-w-[80px]">
                    {user?.name}
                  </div>
                </div>
              </motion.div>

              {/* Dashboard Button */}
              <motion.button
                onClick={
                  role === "mentor"
                    ? handleMentorDashboard
                    : handleStudentDashboard
                }
                className="px-4 py-2 rounded-lg font-medium text-sm text-accent border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {role === "mentor" ? "Dashboard" : "Dashboard"}
              </motion.button>

              {/* Logout Button */}
              <motion.button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg font-medium text-sm text-red-400 border border-red-400/30 hover:border-red-400 hover:bg-red-400/10 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={16} />
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={handleSignIn}
              className="px-5 py-2 rounded-lg font-medium text-sm bg-gradient-to-r from-accent to-accent-purple text-dark shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          )}
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden absolute top-full left-0 right-0 border-t border-white/10"
        initial={{ maxHeight: 0, opacity: 0 }}
        animate={{
          maxHeight: isMobileOpen ? 500 : 0,
          opacity: isMobileOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <div
          className={`backdrop-blur-lg bg-dark/40 border-b border-white/10 p-4 space-y-4`}
        >
          {!isAuthenticated && (
            <>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-sm font-medium text-gray-300 hover:text-accent transition-colors px-2"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t border-white/10 pt-4">
                <motion.button
                  onClick={handleSignIn}
                  className="w-full px-4 py-2 rounded-lg font-medium text-sm bg-gradient-to-r from-accent to-accent-purple text-dark"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              </div>
            </>
          )}

          {isAuthenticated && (
            <div className="space-y-2 border-t border-white/10 pt-4">
              <div className="px-2 py-2 rounded-lg bg-accent/10 border border-accent/30">
                <div className="text-xs font-semibold text-accent capitalize">
                  {role}
                </div>
                <div className="text-xs text-gray-400">{user?.name}</div>
              </div>
              <motion.button
                onClick={
                  role === "mentor"
                    ? handleMentorDashboard
                    : handleStudentDashboard
                }
                className="w-full px-4 py-2 rounded-lg font-medium text-sm text-accent border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                Dashboard
              </motion.button>
              <motion.button
                onClick={handleLogout}
                className="w-full px-4 py-2 rounded-lg font-medium text-sm text-red-400 border border-red-400/30 hover:border-red-400 hover:bg-red-400/10 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={16} />
                Logout
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}

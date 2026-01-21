import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar({ onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, role, logout } = useAuth();
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    "Features",
    "How it Works",
    "Mentors",
    "Reports",
    "Pricing",
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

  const handleLogin = () => {
    navigate("/login");
    setIsMobileOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect-sm shadow-lg" : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
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
            className="w-10 h-10 bg-gradient-to-br from-accent to-accent-purple rounded-lg flex items-center justify-center font-bold text-dark"
            animate={{
              boxShadow: [
                "0 0 10px rgba(0, 217, 255, 0)",
                "0 0 20px rgba(0, 217, 255, 0.3)",
                "0 0 10px rgba(0, 217, 255, 0)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            V
          </motion.div>
          <span className="text-xl font-bold glow-text">Vorko</span>
        </motion.div>

        {/* Desktop Menu */}
        <motion.div
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {navItems.map((item, idx) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm font-medium relative group text-gray-300 hover:text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5 + idx * 0.1,
                duration: 0.4,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-purple group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.5,
            ease: "easeOut",
          }}
          className="hidden md:flex items-center gap-3"
        >
          {isAuthenticated ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30">
                <div>
                  <div className="text-xs font-semibold text-accent capitalize">
                    {role}
                  </div>
                  <div className="text-xs text-gray-400">{user?.name}</div>
                </div>
              </div>

              {/* Dashboard Button */}
              <motion.button
                onClick={
                  role === "mentor"
                    ? handleMentorDashboard
                    : handleStudentDashboard
                }
                className="px-5 py-2 rounded-lg font-medium text-sm text-accent border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {role === "mentor" ? "Mentor Dashboard" : "Student Dashboard"}
              </motion.button>

              {/* Logout Button */}
              <motion.button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg font-medium text-sm text-red-400 border border-red-400/30 hover:border-red-400 hover:bg-red-400/10 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={16} />
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                onClick={handleLogin}
                className="px-5 py-2 rounded-lg font-medium text-sm text-accent border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
              <motion.button
                onClick={() => navigate("/signup")}
                className="px-6 py-2 rounded-lg font-medium bg-gradient-to-r from-accent to-accent-purple text-dark shadow-glow hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden overflow-hidden ${
          isMobileOpen ? "max-h-96" : "max-h-0"
        }`}
        animate={{ maxHeight: isMobileOpen ? 500 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="glass-effect-sm m-4 p-4 space-y-4">
          {!isAuthenticated && (
            <>
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="block text-sm font-medium text-gray-300 hover:text-accent transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="border-t border-accent/20 pt-4 space-y-2">
                <motion.button
                  onClick={handleLogin}
                  className="w-full px-4 py-2 rounded-lg font-medium text-sm text-accent border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
                <motion.button
                  onClick={() => navigate("/signup")}
                  className="w-full px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-accent to-accent-purple text-dark"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </div>
            </>
          )}

          {isAuthenticated && (
            <div className="space-y-2 border-t border-accent/20 pt-4">
              <div className="px-3 py-2 rounded-lg bg-accent/10 border border-accent/30">
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
                {role === "mentor" ? "Mentor Dashboard" : "Student Dashboard"}
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

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, isLoading, getDashboardUrl, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [pendingData, setPendingData] = useState({
    name: null,
    role: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(location.state?.message || "");

  // Load pending data from sessionStorage (from signup flow)
  useEffect(() => {
    const pendingName = sessionStorage.getItem("pendingName");
    const pendingRole = sessionStorage.getItem("pendingRole");
    const pendingEmail = sessionStorage.getItem("pendingEmail");

    if (pendingName && pendingRole && pendingEmail) {
      setPendingData({ name: pendingName, role: pendingRole });
      setFormData((prev) => ({ ...prev, email: pendingEmail }));
    }

    // Pre-fill email from location state if provided
    if (location.state?.email) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const dashboardUrl = getDashboardUrl();
      console.log(
        "[LoginPage] User authenticated, redirecting to:",
        dashboardUrl
      );
      navigate(dashboardUrl, { replace: true });
    }
  }, [isAuthenticated, navigate, getDashboardUrl]);

  // Demo credentials info
  const demoCredentials = {
    student: {
      email: "student@vorko.com",
      password: "student123",
    },
    mentor: {
      email: "mentor@vorko.com",
      password: "mentor123",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleDemoLogin = (role) => {
    const credentials = demoCredentials[role];
    setFormData({
      email: credentials.email,
      password: credentials.password,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Pass pending name and role if available (from signup flow)
      await login(
        formData.email,
        formData.password,
        pendingData.name || undefined,
        pendingData.role || undefined
      );

      // Show success message
      setSuccess("Login successful!");

      // Clear pending data after successful login
      sessionStorage.removeItem("pendingName");
      sessionStorage.removeItem("pendingRole");
      sessionStorage.removeItem("pendingEmail");

      // IMPORTANT: Do NOT redirect here! The useEffect watcher above
      // will handle redirect when auth state updates. This ensures:
      // 1. Auth context has fully synced
      // 2. User and profile are loaded
      // 3. Redirect happens immediately when auth is ready
      // 4. No timing issues or race conditions
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      console.error("[LoginPage] Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-dark-lighter flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent/10 to-accent-purple/10 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-gradient-to-tr from-accent-purple/10 to-accent-blue/10 rounded-full blur-3xl opacity-20"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="glass-effect rounded-2xl p-8 border border-accent/10 shadow-2xl">
          {/* Logo & Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-purple rounded-lg flex items-center justify-center font-bold text-dark text-xl">
                V
              </div>
              <span className="text-2xl font-bold glow-text">Vorko</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </motion.div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-gap-2 gap-2"
            >
              <AlertCircle
                size={18}
                className="text-red-400 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Success Alert */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex items-gap-2 gap-2"
            >
              <Check
                size={18}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-green-400">{success}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@vorko.com"
                className="w-full px-4 py-2.5 rounded-lg bg-accent/5 border border-accent/20 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg bg-accent/5 border border-accent/20 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full mt-6 py-2.5 px-4 rounded-lg font-medium bg-gradient-to-r from-accent to-accent-purple text-dark shadow-glow hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="space-y-2 mb-6 p-4 rounded-lg bg-accent/5 border border-accent/20"
          >
            <p className="text-xs text-gray-400 font-medium">
              Demo Credentials:
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleDemoLogin("student")}
                className="w-full text-left text-xs py-2 px-2 rounded bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
              >
                📚 Student: student@vorko.com / student123
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("mentor")}
                className="w-full text-left text-xs py-2 px-2 rounded bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
              >
                👨‍🏫 Mentor: mentor@vorko.com / mentor123
              </button>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-2 text-center text-sm text-gray-400"
          >
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-accent hover:text-accent-purple transition-colors font-medium"
              >
                Sign up here
              </Link>
            </p>
            <Link
              to="/"
              className="block text-accent hover:text-accent-purple transition-colors font-medium"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

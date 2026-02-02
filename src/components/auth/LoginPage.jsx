import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Check, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, isLoading, getDashboardUrl, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

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
        dashboardUrl,
      );
      navigate(dashboardUrl, { replace: true });
    }
  }, [isAuthenticated, navigate, getDashboardUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
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
        pendingData.role || undefined,
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
    <div className="relative min-h-screen bg-gradient-to-br from-dark via-[#0f1428] to-dark-lighter flex items-center justify-center p-4 overflow-hidden">
      {/* Premium background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-right accent orb */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-accent/20 to-accent-purple/10 rounded-full blur-3xl"
        />

        {/* Bottom-left accent orb */}
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-0 -left-48 w-96 h-96 bg-gradient-to-tr from-accent-purple/15 to-accent-blue/10 rounded-full blur-3xl"
        />

        {/* Top-left accent orb */}
        <div className="absolute top-1/4 -left-24 w-64 h-64 bg-gradient-to-br from-accent-blue/10 to-transparent rounded-full blur-3xl opacity-30" />
      </div>

      {/* Premium card container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.23, 1, 0.32, 1], // custom ease curve like Linear.app
        }}
        className="w-full max-w-md relative z-10"
      >
        {/* Glow backdrop effect */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-accent/20 to-accent-purple/10 blur-2xl opacity-40" />

        {/* Main card */}
        <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/8 via-white/5 to-white/3 rounded-2xl p-8 border border-white/15 shadow-2xl">
          {/* Decorative top border accent */}
          <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

          {/* Logo & Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="flex items-center justify-center mb-5"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-purple rounded-xl blur-lg opacity-50" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-accent to-accent-purple rounded-xl flex items-center justify-center font-bold text-dark text-lg shadow-lg">
                  V
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-3xl font-bold text-white mb-3 tracking-tight"
            >
              Welcome back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-sm text-gray-400 leading-relaxed"
            >
              Sign in to your Vorko account to continue
            </motion.p>
          </motion.div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-5 overflow-hidden"
            >
              <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/15 to-red-500/5 border border-red-500/30 backdrop-blur-sm flex items-start gap-3">
                <AlertCircle
                  size={18}
                  className="text-red-400 flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-red-300 font-medium">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Success Alert */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-5 overflow-hidden"
            >
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/15 to-green-500/5 border border-green-500/30 backdrop-blur-sm flex items-start gap-3">
                <Check
                  size={18}
                  className="text-green-400 flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-green-300 font-medium">{success}</p>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 mb-8">
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <label className="text-xs font-semibold text-gray-300 mb-2.5 block uppercase tracking-wider opacity-80">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 focus:border-accent/50 focus:bg-white/8 focus:ring-2 focus:ring-accent/20 backdrop-blur-sm"
                />
                {focusedField === "email" && (
                  <motion.div
                    layoutId="email-focus-glow"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/10 to-accent-purple/10 pointer-events-none -z-10 blur-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <label className="text-xs font-semibold text-gray-300 mb-2.5 block uppercase tracking-wider opacity-80">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 focus:border-accent/50 focus:bg-white/8 focus:ring-2 focus:ring-accent/20 backdrop-blur-sm"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </motion.button>
                {focusedField === "password" && (
                  <motion.div
                    layoutId="password-focus-glow"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/10 to-accent-purple/10 pointer-events-none -z-10 blur-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="w-full mt-8 py-3.5 px-4 rounded-xl font-semibold bg-gradient-to-r from-accent via-accent-purple to-accent-blue text-dark shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full"
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/20 to-accent/0"
                initial={{ x: "-100%" }}
                animate={!isLoading ? { x: "100%" } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </form>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="space-y-3 text-center text-sm"
          >
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-accent hover:text-accent-purple font-semibold transition-colors duration-200 relative group"
              >
                Sign up
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 font-medium"
            >
              <span>←</span> Back to Home
            </Link>
          </motion.div>

          {/* Decorative bottom border accent */}
          <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-accent-purple/40 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

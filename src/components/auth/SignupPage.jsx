import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Watermark from "../Watermark";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isLoading, checkEmail } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const handleEmailBlur = async () => {
    const email = formData.email.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return; // Basic validation handled by validateForm
    }

    setIsCheckingEmail(true);
    try {
      const isRegistered = await checkEmail(email);
      if (isRegistered) {
        setFormErrors((prev) => ({ ...prev, email: "This email is already registered." }));
      }
    } catch (err) {
      console.error("Email check failed", err);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      // Sign up (auth only - profile created by database trigger)
      const result = await signup(
        formData.name,
        formData.email,
        formData.password,
        formData.role,
      );

      // Store name and role in sessionStorage for login flow
      sessionStorage.setItem("pendingName", formData.name);
      sessionStorage.setItem("pendingRole", formData.role);
      sessionStorage.setItem("pendingEmail", formData.email);

      setSuccess("Account created successfully! Please log in.");

      // Redirect to login page
      setTimeout(() => {
        navigate("/login", {
          state: {
            email: formData.email,
            message: "Account created! Please log in with your credentials.",
          },
        });
      }, 300);
    } catch (err) {
      const errorMessage = err.message || "Signup failed. Please try again.";
      if (errorMessage.toLowerCase().includes("already registered")) {
        setFormErrors((prev) => ({ ...prev, email: "This email is already registered." }));
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-dark via-dark to-dark-lighter flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent/10 to-accent-purple/10 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-gradient-to-tr from-accent-purple/10 to-accent-blue/10 rounded-full blur-3xl opacity-20"></div>
      </div>

      <Watermark />

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
            <div className="flex items-center justify-center gap-3 mb-4">
              {/* Glassmorphic V tile */}
              <motion.div
                className="relative flex-shrink-0"
                style={{ width: 42, height: 42 }}
                whileHover={{ y: -3, scale: 1.07 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Frosted glass body */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255, 255, 255, 0.07)",
                    backdropFilter: "blur(16px) saturate(180%)",
                    WebkitBackdropFilter: "blur(16px) saturate(180%)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.1), 0 4px 24px rgba(0,217,255,0.1), 0 1px 2px rgba(0,0,0,0.4)",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[45%] pointer-events-none"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.03) 100%)",
                      borderRadius: "16px 16px 0 0",
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at 60% 30%, rgba(0,217,255,0.09) 0%, transparent 70%)",
                    }}
                  />
                </div>
                {/* Outer ambient glow */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ boxShadow: "0 0 0 1px rgba(0,217,255,0.12), 0 8px 32px rgba(0,217,255,0.08)" }}
                />
                {/* V letter */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
                  <span
                    className="font-black"
                    style={{
                      fontSize: "1.15rem",
                      letterSpacing: "-0.04em",
                      color: "rgba(255,255,255,0.95)",
                      textShadow: "0 0 12px rgba(0,217,255,0.6), 0 1px 3px rgba(0,0,0,0.4)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    V
                  </span>
                </div>
              </motion.div>

              {/* Chrome animated wordmark */}
              <motion.span
                className="font-black select-none"
                style={{
                  fontSize: "1.5rem",
                  letterSpacing: "-0.055em",
                  lineHeight: 1,
                  background: "linear-gradient(135deg, #e8e8e8 0%, #ffffff 20%, #c0c0c0 40%, #f5f5f5 55%, #a8a8a8 70%, #ffffff 85%, #d4d4d4 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))",
                }}
                animate={{ backgroundPosition: ["0% center", "200% center"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              >
                Vorko
              </motion.span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Join Vorko</h1>
            <p className="text-gray-400">Create your account</p>
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

          {/* Role Selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6"
          >
            <label className="text-sm font-medium text-gray-300 mb-3 block">
              I am a:
            </label>
            <div className="flex gap-3">
              {["student", "mentor"].map((role) => (
                <motion.button
                  key={role}
                  type="button"
                  onClick={() => handleRoleChange(role)}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all capitalize ${
                    formData.role === role
                      ? "bg-gradient-to-r from-accent to-accent-purple text-dark shadow-glow border border-accent"
                      : "bg-accent/5 text-gray-300 border border-accent/20 hover:border-accent/40"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {role}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 mb-6">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={`w-full px-4 py-2.5 rounded-lg bg-accent/5 border ${
                  formErrors.name ? "border-red-500/50 focus:ring-red-500/30" : "border-accent/20 focus:border-accent focus:ring-accent/30"
                } text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all`}
              />
              {formErrors.name && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle size={12} /> {formErrors.name}
                </motion.p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label className="text-sm font-medium text-gray-300 mb-2 flex justify-between items-center">
                Email Address
                {isCheckingEmail && <span className="text-xs text-accent animate-pulse">Checking...</span>}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                placeholder="name@vorko.com"
                className={`w-full px-4 py-2.5 rounded-lg bg-accent/5 border ${
                  formErrors.email ? "border-red-500/50 focus:ring-red-500/30" : "border-accent/20 focus:border-accent focus:ring-accent/30"
                } text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all`}
              />
              {formErrors.email && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle size={12} /> {formErrors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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
                className={`w-full px-4 py-2.5 rounded-lg bg-accent/5 border ${
                  formErrors.password ? "border-red-500/50 focus:ring-red-500/30" : "border-accent/20 focus:border-accent focus:ring-accent/30"
                } text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all`}
              />
              {formErrors.password && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle size={12} /> {formErrors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 rounded-lg bg-accent/5 border ${
                  formErrors.confirmPassword ? "border-red-500/50 focus:ring-red-500/30" : "border-accent/20 focus:border-accent focus:ring-accent/30"
                } text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all`}
              />
              {formErrors.confirmPassword && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle size={12} /> {formErrors.confirmPassword}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full mt-6 py-2.5 px-4 rounded-lg font-medium bg-gradient-to-r from-accent to-accent-purple text-dark shadow-glow hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </motion.button>
          </form>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="space-y-2 text-center text-sm text-gray-400"
          >
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-accent hover:text-accent-purple transition-colors font-medium"
              >
                Sign in here
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

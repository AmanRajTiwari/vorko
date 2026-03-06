import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Check, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Watermark from "../Watermark";
import { supabase } from "../../lib/supabase";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { updatePassword, isLoading: contextLoading } = useAuth();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);

  // Check if we arrived here with an active session (from the email link)
  useEffect(() => {
    const checkSession = async () => {
      // Supabase automatically handles the access_token hash in the URL
      // If valid, it establishes a session.
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        setError("Invalid or expired password reset link. Please request a new one.");
      }
      setIsVerifying(false);
    };

    checkSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!password) {
      setError("Please enter a new password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await updatePassword(password);
      setSuccess(true);
      // Wait a moment then redirect to login
      setTimeout(() => {
        navigate("/login", { 
          state: { message: "Password updated successfully! Please log in with your new password." } 
        });
      }, 2500);
    } catch (err) {
      setError(err.message || "Failed to update password. Please try again.");
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mb-4" />
        <p className="text-gray-400 animate-pulse">Verifying link...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-dark via-[#0f1428] to-dark-lighter flex items-center justify-center p-4 overflow-hidden">
      {/* Premium background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-accent/20 to-accent-purple/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 -left-48 w-96 h-96 bg-gradient-to-tr from-accent-purple/15 to-accent-blue/10 rounded-full blur-3xl"
        />
      </div>

      <Watermark />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-accent/20 to-accent-purple/10 blur-2xl opacity-40" />

        <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/8 via-white/5 to-white/3 rounded-2xl p-8 border border-white/15 shadow-2xl">
          <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-center mb-8"
          >
            <motion.h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
              Create New Password
            </motion.h1>
            <motion.p className="text-sm text-gray-400">
              Please enter your new password below.
            </motion.p>
          </motion.div>

          {/* Alerts */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6"
            >
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6"
            >
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-start gap-3">
                <Check size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-300">Password updated! Redirecting to login...</p>
              </div>
            </motion.div>
          )}

          {/* Form */}
          {error && error.includes("Invalid or expired") ? (
            <div className="text-center mt-6">
              <Link
                to="/forgot-password"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
              >
                Request New Link
              </Link>
            </div>
          ) : !success ? (
            <form onSubmit={handleSubmit} className="space-y-5 mb-4">
              {/* New Password */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="text-xs font-semibold text-gray-300 mb-2 block uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 focus:border-accent/50 focus:bg-white/8 focus:ring-2 focus:ring-accent/20 backdrop-blur-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
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

              {/* Confirm Password */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="text-xs font-semibold text-gray-300 mb-2 block uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                    onFocus={() => setFocusedField("confirm")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 focus:border-accent/50 focus:bg-white/8 focus:ring-2 focus:ring-accent/20 backdrop-blur-sm"
                  />
                  {focusedField === "confirm" && (
                    <motion.div
                      layoutId="confirm-focus-glow"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/10 to-accent-purple/10 pointer-events-none -z-10 blur-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={contextLoading}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full mt-4 py-3.5 px-4 rounded-xl font-semibold bg-gradient-to-r from-accent via-accent-purple to-accent-blue text-dark shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                whileHover={!contextLoading ? { scale: 1.02 } : {}}
                whileTap={!contextLoading ? { scale: 0.98 } : {}}
              >
                <span className="flex items-center justify-center gap-2">
                  {contextLoading ? "Updating..." : "Update Password"}
                  {!contextLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </span>
              </motion.button>
            </form>
          ) : null}

          <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-accent-purple/40 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

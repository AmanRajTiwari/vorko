import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Watermark from "../Watermark";

export default function ForgotPasswordPage() {
  const { resetPassword, isLoading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-dark via-[#0f1428] to-dark-lighter flex items-center justify-center p-4 overflow-hidden">
      {/* Premium background gradient orbs (matches login/signup) */}
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

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-center mb-8"
          >
            <motion.h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
              Reset Password
            </motion.h1>
            <motion.p className="text-sm text-gray-400 leading-relaxed">
              {success 
                ? "Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder."
                : "Enter your email address and we'll send you a link to reset your password."}
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
              className="mb-8"
            >
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-start gap-3">
                <Check size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-300">Reset link sent successfully!</p>
              </div>
            </motion.div>
          )}

          {/* Form */}
          {!success && (
            <form onSubmit={handleSubmit} className="space-y-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="text-xs font-semibold text-gray-300 mb-2 block uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="you@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                      error ? "border-red-500/50 focus:ring-red-500/30" : "border-white/15 focus:border-accent/50 focus:ring-accent/20"
                    } text-white placeholder-gray-500 focus:outline-none transition-all duration-300 focus:bg-white/8 focus:ring-2`}
                  />
                  {focusedField === "email" && !error && (
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

              <motion.button
                type="submit"
                disabled={isLoading}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full py-3.5 px-4 rounded-xl font-semibold bg-gradient-to-r from-accent via-accent-purple to-accent-blue text-dark shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? "Sending..." : "Send Reset Link"}
                  {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </span>
              </motion.button>
            </form>
          )}

          {/* Footer Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 font-medium group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </motion.div>

          <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-accent-purple/40 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

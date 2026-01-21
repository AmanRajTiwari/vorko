import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
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
        formData.role
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
      setError(err.message || "Signup failed. Please try again.");
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
                className="w-full px-4 py-2.5 rounded-lg bg-accent/5 border border-accent/20 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
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
                className="w-full px-4 py-2.5 rounded-lg bg-accent/5 border border-accent/20 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
              />
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
                className="w-full px-4 py-2.5 rounded-lg bg-accent/5 border border-accent/20 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
              />
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

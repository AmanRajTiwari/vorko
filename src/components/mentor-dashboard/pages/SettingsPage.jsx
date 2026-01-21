import React, { useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../../../context/DataContext";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Bell,
  Shield,
  LogOut,
  Save,
  Upload,
} from "lucide-react";
import MentorLayout from "../MentorLayout";

function ProfileSection({ mentor, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mentor.name,
    email: mentor.email,
    phone: mentor.phone,
    department: mentor.department,
    specialization: mentor.specialization,
    bio: mentor.bio,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-6 mb-6"
      variants={containerVariants}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Profile Information</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage your mentor profile
          </p>
        </div>
        <motion.button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            isEditing
              ? "bg-gradient-to-r from-green-500 to-green-600"
              : "bg-gradient-to-r from-blue-500 to-blue-600"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          ) : (
            "Edit Profile"
          )}
        </motion.button>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
        <motion.div
          className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-2xl font-bold"
          whileHover={{ scale: 1.1 }}
        >
          {mentor.name.charAt(0)}
        </motion.div>
        <div>
          <p className="text-sm font-semibold text-accent">{mentor.name}</p>
          <p className="text-xs text-gray-400">{mentor.specialization}</p>
          {!isEditing && (
            <motion.button
              className="mt-2 text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded transition-all flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Upload className="w-3 h-3" />
              Change Avatar
            </motion.button>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="text-sm font-semibold mb-2 block text-gray-300">
            <User className="w-4 h-4 inline mr-2" />
            Full Name
          </label>
          <input
            disabled={!isEditing}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-500 focus:border-accent outline-none transition-colors disabled:opacity-50"
          />
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="text-sm font-semibold mb-2 block text-gray-300">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address
          </label>
          <input
            disabled={!isEditing}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-500 focus:border-accent outline-none transition-colors disabled:opacity-50"
          />
        </motion.div>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="text-sm font-semibold mb-2 block text-gray-300">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number
          </label>
          <input
            disabled={!isEditing}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-500 focus:border-accent outline-none transition-colors disabled:opacity-50"
          />
        </motion.div>

        {/* Department */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm font-semibold mb-2 block text-gray-300">
            <Briefcase className="w-4 h-4 inline mr-2" />
            Department
          </label>
          <input
            disabled={!isEditing}
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-500 focus:border-accent outline-none transition-colors disabled:opacity-50"
          />
        </motion.div>

        {/* Specialization */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-2"
        >
          <label className="text-sm font-semibold mb-2 block text-gray-300">
            <Briefcase className="w-4 h-4 inline mr-2" />
            Specialization
          </label>
          <input
            disabled={!isEditing}
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-500 focus:border-accent outline-none transition-colors disabled:opacity-50"
          />
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="md:col-span-2"
        >
          <label className="text-sm font-semibold mb-2 block text-gray-300">
            Bio
          </label>
          <textarea
            disabled={!isEditing}
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-500 focus:border-accent outline-none transition-colors resize-none disabled:opacity-50"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function PreferencesSection({ preferences, onUpdate }) {
  const handleToggle = (key) => {
    onUpdate({
      ...preferences,
      [key]: !preferences[key],
    });
  };

  const preferenceOptions = [
    {
      key: "emailNotifications",
      label: "Email Notifications",
      description: "Receive email updates about projects and meetings",
      icon: Bell,
    },
    {
      key: "meetingReminders",
      label: "Meeting Reminders",
      description: "Get reminders before scheduled meetings",
      icon: Bell,
    },
    {
      key: "weeklyReports",
      label: "Weekly Reports",
      description: "Receive a weekly summary of project progress",
      icon: Bell,
    },
    {
      key: "projectAlerts",
      label: "Project Alerts",
      description: "Be notified about important project updates",
      icon: Bell,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08 },
    },
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-6 mb-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="mb-6 pb-6 border-b border-white/10">
        <h2 className="text-2xl font-bold">Notification Preferences</h2>
        <p className="text-gray-400 text-sm mt-1">
          Manage how you receive notifications
        </p>
      </div>

      {/* Preference Items */}
      <div className="space-y-3">
        {preferenceOptions.map((pref) => {
          const Icon = pref.icon;
          const isEnabled = preferences[pref.key];

          return (
            <motion.div
              key={pref.key}
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold">{pref.label}</p>
                  <p className="text-xs text-gray-400">{pref.description}</p>
                </div>
              </div>

              {/* Toggle Switch */}
              <motion.button
                onClick={() => handleToggle(pref.key)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isEnabled ? "bg-accent" : "bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute w-5 h-5 bg-white rounded-full top-0.5"
                  animate={{ left: isEnabled ? "26px" : "2px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function SettingsPage() {
  const { mentor, updateMentorProfile, updatePreferences } = useData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MentorLayout
      pageTitle="Settings"
      pageDescription="Manage your profile and preferences"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Section */}
        <motion.div variants={itemVariants}>
          <ProfileSection mentor={mentor} onUpdate={updateMentorProfile} />
        </motion.div>

        {/* Preferences Section */}
        <motion.div variants={itemVariants}>
          <PreferencesSection
            preferences={mentor.preferences}
            onUpdate={updatePreferences}
          />
        </motion.div>

        {/* Security Section */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Security
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Manage your account security
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <motion.button
              className="w-full p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-left transition-all flex items-center justify-between"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-semibold">Change Password</span>
              <span className="text-gray-400 text-sm">
                Update your password
              </span>
            </motion.button>

            <motion.button
              className="w-full p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-left transition-all flex items-center justify-between"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-semibold">Two-Factor Authentication</span>
              <span className="text-gray-400 text-sm">
                Enable 2FA for security
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Logout Section */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-red-300 flex items-center gap-2">
                <LogOut className="w-5 h-5" />
                Logout
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Sign out from your account
              </p>
            </div>
            <motion.button
              className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold rounded-lg transition-all border border-red-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Out
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </MentorLayout>
  );
}

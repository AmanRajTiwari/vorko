import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Book,
  Bell,
  Lock,
  Palette,
  Save,
} from "lucide-react";
import { StudentDataContext } from "../../../context/StudentContext";

export default function SettingsPage() {
  const { student, settings, updateStudentProfile, updateSettings } =
    useContext(StudentDataContext);
  const [formData, setFormData] = useState(student);
  const [localSettings, setLocalSettings] = useState(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = () => {
    updateStudentProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleToggleSetting = (key) => {
    const newSettings = { ...localSettings, [key]: !localSettings[key] };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleThemeChange = (theme) => {
    const newSettings = { ...localSettings, theme };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  };

  return (
    <div className="min-h-screen p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="text-gray-400">Manage your profile and preferences.</p>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-effect p-8 rounded-xl border border-white/10"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <User size={24} />
          Profile Information
        </h2>

        <div className="space-y-6">
          {/* Profile Picture */}
          <div>
            <label className="block text-sm text-gray-400 mb-3">
              Profile Picture
            </label>
            <div className="flex items-end gap-4">
              <img
                src={formData.profilePicture}
                alt={formData.name}
                className="w-20 h-20 rounded-full"
              />
              <motion.button
                className="px-4 py-2 rounded-lg glass-effect border border-white/10 hover:border-white/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Change Picture
              </motion.button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Roll Number
              </label>
              <input
                type="text"
                value={formData.rollNumber}
                onChange={(e) =>
                  setFormData({ ...formData, rollNumber: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                <Mail size={16} />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                <Phone size={16} />
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Semester
              </label>
              <input
                type="text"
                value={formData.semester}
                onChange={(e) =>
                  setFormData({ ...formData, semester: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
              <Book size={16} />
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent transition-colors resize-none"
              rows="3"
            />
          </div>

          <motion.button
            onClick={handleSaveProfile}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-accent-purple text-dark font-semibold hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save size={20} />
            Save Profile
          </motion.button>

          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300 text-sm"
            >
              ✓ Profile updated successfully!
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Preferences Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-effect p-8 rounded-xl border border-white/10"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Bell size={24} />
          Notification Preferences
        </h2>

        <div className="space-y-4">
          {[
            {
              id: "emailNotifications",
              label: "Email Notifications",
              description: "Receive updates via email",
            },
            {
              id: "pushNotifications",
              label: "Push Notifications",
              description: "Receive browser push notifications",
            },
            {
              id: "weeklyReport",
              label: "Weekly Report",
              description: "Get a summary of your activity every week",
            },
            {
              id: "twoFactorAuth",
              label: "Two-Factor Authentication",
              description: "Require 2FA for account login",
            },
          ].map((pref) => (
            <motion.div
              key={pref.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors"
            >
              <div>
                <p className="font-semibold">{pref.label}</p>
                <p className="text-sm text-gray-400 mt-1">{pref.description}</p>
              </div>
              <motion.button
                onClick={() => handleToggleSetting(pref.id)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  localSettings[pref.id]
                    ? "bg-gradient-to-r from-accent to-accent-purple"
                    : "bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{
                    x: localSettings[pref.id] ? 24 : 4,
                  }}
                  className="w-4 h-4 rounded-full bg-white absolute top-1"
                />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Appearance Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-effect p-8 rounded-xl border border-white/10"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Palette size={24} />
          Appearance
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-3">Theme</label>
            <div className="flex gap-4">
              {["light", "dark"].map((theme) => (
                <motion.button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    localSettings.theme === theme
                      ? "bg-gradient-to-r from-accent to-accent-purple text-dark"
                      : "glass-effect border border-white/10 hover:border-white/20 text-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-3">
              Privacy Level
            </label>
            <select
              value={localSettings.privacyLevel}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  privacyLevel: e.target.value,
                })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent transition-colors"
            >
              <option value="private">Private (Only Me)</option>
              <option value="team">Team</option>
              <option value="public">Public</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Security Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-effect p-8 rounded-xl border border-white/10"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Lock size={24} />
          Security
        </h2>

        <div className="space-y-3">
          <motion.button
            className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 hover:border-white/20 text-left font-semibold transition-colors hover:bg-white/5"
            whileHover={{ x: 5 }}
          >
            Change Password
          </motion.button>
          <motion.button
            className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 hover:border-white/20 text-left font-semibold transition-colors hover:bg-white/5"
            whileHover={{ x: 5 }}
          >
            View Active Sessions
          </motion.button>
          <motion.button
            className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 hover:border-white/20 text-left font-semibold transition-colors hover:bg-white/5"
            whileHover={{ x: 5 }}
          >
            Download Data
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

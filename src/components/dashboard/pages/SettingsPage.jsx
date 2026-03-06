import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, Book, Bell, Lock, Palette,
  Save, CheckCircle, AlertCircle, Loader, Shield, Eye, EyeOff,
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { updateUserProfile } from "../../../lib/auth";
import { StudentDataContext } from "../../../context/StudentContext";
import { supabase } from "../../../lib/supabase";

// ── helpers ──────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut", delay },
});

const inputCls =
  "w-full px-4 py-2.5 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all duration-200 " +
  "bg-white/5 border border-white/10 focus:bg-white/[0.07] focus:border-cyan-500/60 " +
  "focus:shadow-[0_0_0_3px_rgba(0,217,255,0.08)]";

const labelCls =
  "block text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5";

// ── Toggle switch — pure CSS for zero snap-back bugs ─────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange();
      }}
      className="relative flex-shrink-0 cursor-pointer"
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: checked
          ? "linear-gradient(135deg,#00d9ff,#a78bfa)"
          : "rgba(255,255,255,0.1)",
        boxShadow: checked ? "0 0 10px rgba(0,217,255,0.35)" : "none",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 4,
          left: checked ? 24 : 4,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
          transition: "left 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
        }}
      />
    </button>
  );
}

// ── Section card ──────────────────────────────────────────────────────────────
function Section({ children }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: "24px 28px",
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div
        className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
        style={{ background: "rgba(0,217,255,0.10)" }}
      >
        <Icon size={14} className="text-cyan-400" />
      </div>
      <h2 className="text-base font-semibold text-white">{label}</h2>
    </div>
  );
}

// ── Row for notification toggle ───────────────────────────────────────────────
function PrefRow({ label, desc, checked, onChange }) {
  return (
    <div
      className="flex items-center justify-between py-3 px-3 rounded-xl"
      style={{ transition: "background 0.15s" }}
    >
      <div className="mr-4">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
      <Toggle checked={!!checked} onChange={onChange} />
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const { user, profile, refreshProfile } = useAuth();
  const { settings, updateSettings } = useContext(StudentDataContext);

  const getDisplayName = () => {
    if (profile?.name) return profile.name;
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user?.user_metadata?.name) return user.user_metadata.name;
    return ""; // don't fall back to email, leave blank so user fills it
  };

  const [form, setForm] = useState({
    name: getDisplayName(),
    email: profile?.email || user?.email || "",
    phone: profile?.phone || "",
    department: profile?.department || "",
    semester: profile?.semester || "",
    bio: profile?.bio || "",
    roll_number: profile?.roll_number || "",
  });

  useEffect(() => {
    if (profile || user) {
      setForm((prev) => ({
        ...prev,
        name: getDisplayName() || prev.name,
        email: profile?.email || user?.email || prev.email,
        phone: profile?.phone || prev.phone,
        department: profile?.department || prev.department,
        semester: profile?.semester || prev.semester,
        bio: profile?.bio || prev.bio,
        roll_number: profile?.roll_number || prev.roll_number,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, user]);

  const [localSettings, setLocalSettings] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

  const [pwForm, setPwForm] = useState({ newPassword: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [pwStatus, setPwStatus] = useState(null);

  // ── Save profile ──────────────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    if (!user?.id) return;
    setSaving(true);
    setSaveStatus(null);
    try {
      await updateUserProfile(user.id, form.name, profile?.role || "student");

      const extendedFields = {
        phone: form.phone,
        department: form.department,
        semester: form.semester,
        bio: form.bio,
        roll_number: form.roll_number,
      };

      const { error: extError } = await supabase
        .from("profiles")
        .update(extendedFields)
        .eq("id", user.id);

      if (extError) {
        if (extError.code === "PGRST204") {
          setSaveStatus("success");
          setSaveMessage("Name saved! Run migration SQL to enable all fields.");
          if (refreshProfile) await refreshProfile();
        } else {
          throw extError;
        }
      } else {
        setSaveStatus("success");
        setSaveMessage("Profile saved successfully!");
        // Refresh AuthContext so topbar/dropdown reflects new name immediately
        if (refreshProfile) await refreshProfile();
      }
    } catch (err) {
      setSaveStatus("error");
      setSaveMessage(err.message || "Failed to save.");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus(null), 3500);
    }
  };

  // ── Change password ───────────────────────────────────────────────────────
  const handleChangePassword = async () => {
    if (!pwForm.newPassword) { setPwStatus("mismatch"); return; }
    if (pwForm.newPassword !== pwForm.confirm) { setPwStatus("mismatch"); return; }
    if (pwForm.newPassword.length < 6) { setPwStatus("short"); return; }
    setPwSaving(true);
    setPwStatus(null);
    try {
      const { error } = await supabase.auth.updateUser({ password: pwForm.newPassword });
      if (error) throw error;
      setPwStatus("success");
      setPwForm({ newPassword: "", confirm: "" });
    } catch (err) {
      setPwStatus("error");
    } finally {
      setPwSaving(false);
      setTimeout(() => setPwStatus(null), 3500);
    }
  };

  const handleToggle = (key) => {
    const next = { ...localSettings, [key]: !localSettings[key] };
    setLocalSettings(next);
    updateSettings(next);
  };

  const initials = (form.name || user?.email || "U")
    .split(" ").filter(Boolean)
    .map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const notifPrefs = [
    { id: "emailNotifications", label: "Email Notifications", desc: "Receive updates via email" },
    { id: "pushNotifications",  label: "Push Notifications",  desc: "Receive browser push notifications" },
    { id: "weeklyReport",       label: "Weekly Report",        desc: "Get a weekly activity summary" },
  ];

  return (
    <div className="p-5 sm:p-6 lg:p-8 space-y-5" style={{ maxWidth: 760 }}>

      {/* Heading */}
      <motion.div {...fadeUp(0)}>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your profile and preferences.</p>
      </motion.div>

      {/* ── Profile Information ─────────────────────────────────────────── */}
      <motion.div {...fadeUp(0.05)}>
        <Section>
          <SectionTitle icon={User} label="Profile Information" />

          {/* Avatar row */}
          <div
            className="flex items-center gap-4 mb-6 pb-5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white flex-shrink-0 overflow-hidden"
              style={{ background: "linear-gradient(135deg,#00d9ff,#a78bfa)" }}
            >
              {profile?.avatar_url
                ? <img src={profile.avatar_url} alt="avatar" className="w-full h-full rounded-2xl object-cover" />
                : initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">
                {form.name || <span className="text-gray-500 italic">No name set</span>}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{form.email}</p>
              <span
                className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                style={{ background: "rgba(0,217,255,0.1)", color: "#00d9ff" }}
              >
                {profile?.role || "student"}
              </span>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>Full Name</label>
              <input className={inputCls} value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name" />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <div className="relative">
                <input
                  className={inputCls + " opacity-50 cursor-not-allowed pr-10"}
                  value={form.email} readOnly
                  title="Email cannot be changed here" />
                <Mail size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input className={inputCls} value={form.phone} type="tel"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX" />
            </div>
            <div>
              <label className={labelCls}>Roll Number</label>
              <input className={inputCls} value={form.roll_number}
                onChange={(e) => setForm({ ...form, roll_number: e.target.value })}
                placeholder="e.g. 20CS123" />
            </div>
            <div>
              <label className={labelCls}>Department</label>
              <input className={inputCls} value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                placeholder="e.g. Computer Science" />
            </div>
            <div>
              <label className={labelCls}>Semester</label>
              <input className={inputCls} value={form.semester}
                onChange={(e) => setForm({ ...form, semester: e.target.value })}
                placeholder="e.g. 6" />
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <label className={labelCls} style={{ margin: 0 }}>Bio</label>
              <span className="text-[11px] text-gray-600">{form.bio.length}/200</span>
            </div>
            <textarea
              className={inputCls + " resize-none"}
              rows={3} maxLength={200}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Tell us a little about yourself…"
            />
          </div>

          {/* Save button */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#0a0e27] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg,#00d9ff,#a78bfa)",
                boxShadow: saving ? "none" : "0 4px 18px rgba(0,217,255,0.25)",
              }}
            >
              {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? "Saving…" : "Save Profile"}
            </button>

            <AnimatePresence>
              {saveStatus && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  className={`flex items-center gap-1.5 text-sm font-medium ${saveStatus === "success" ? "text-emerald-400" : "text-red-400"}`}
                >
                  {saveStatus === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                  {saveMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Section>
      </motion.div>

      {/* ── Notification Preferences ──────────────────────────────────────── */}
      <motion.div {...fadeUp(0.1)}>
        <Section>
          <SectionTitle icon={Bell} label="Notification Preferences" />
          <div className="divide-y divide-white/[0.05]">
            {notifPrefs.map((p) => (
              <PrefRow
                key={p.id}
                label={p.label}
                desc={p.desc}
                checked={!!localSettings[p.id]}
                onChange={() => handleToggle(p.id)}
              />
            ))}
          </div>
        </Section>
      </motion.div>

      {/* ── Appearance ───────────────────────────────────────────────────── */}
      <motion.div {...fadeUp(0.15)}>
        <Section>
          <SectionTitle icon={Palette} label="Appearance" />
          <div>
            <label className={labelCls}>Theme</label>
            <div className="flex gap-3">
              {["dark", "light"].map((t) => {
                const active = localSettings.theme === t;
                return (
                  <button
                    key={t}
                    onClick={() => {
                      const s = { ...localSettings, theme: t };
                      setLocalSettings(s);
                      updateSettings(s);
                    }}
                    className="px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-150"
                    style={{
                      background: active ? "linear-gradient(135deg,#00d9ff,#a78bfa)" : "rgba(255,255,255,0.05)",
                      color: active ? "#0a0e27" : "#9ca3af",
                      border: active ? "1px solid transparent" : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>
        </Section>
      </motion.div>

      {/* ── Security ─────────────────────────────────────────────────────── */}
      <motion.div {...fadeUp(0.2)}>
        <Section>
          <SectionTitle icon={Shield} label="Security" />

          {/* 2FA toggle — moved here from Notifications */}
          <div
            className="flex items-center justify-between p-3 rounded-xl mb-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div>
              <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500 mt-0.5">Require 2FA on login</p>
            </div>
            <Toggle
              checked={!!localSettings.twoFactorAuth}
              onChange={() => handleToggle("twoFactorAuth")}
            />
          </div>

          {/* Privacy level — moved here from Appearance */}
          <div className="mb-5">
            <label className={labelCls}>Profile Visibility</label>
            <div className="relative">
              <select
                value={localSettings.privacyLevel}
                onChange={(e) => {
                  const s = { ...localSettings, privacyLevel: e.target.value };
                  setLocalSettings(s);
                  updateSettings(s);
                }}
                className={inputCls}
                style={{
                  background: "rgba(13,17,40,0.9)",
                  appearance: "none",
                  WebkitAppearance: "none",
                  cursor: "pointer",
                }}
              >
                <option value="private" style={{ background: "#0d1128" }}>🔒 Private (Only Me)</option>
                <option value="team"    style={{ background: "#0d1128" }}>👥 Team</option>
                <option value="public"  style={{ background: "#0d1128" }}>🌐 Public</option>
              </select>
              {/* custom chevron */}
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* Change password */}
          <div
            className="p-4 rounded-xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-sm font-medium text-white mb-3">Change Password</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls}>New Password</label>
                <div className="relative">
                  <input type={showPw ? "text" : "password"} className={inputCls + " pr-10"}
                    value={pwForm.newPassword}
                    onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                    placeholder="Min. 6 characters" />
                  <button onClick={() => setShowPw(!showPw)} tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                    {showPw ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>
              <div>
                <label className={labelCls}>Confirm Password</label>
                <div className="relative">
                  <input type={showConfirm ? "text" : "password"} className={inputCls + " pr-10"}
                    value={pwForm.confirm}
                    onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
                    placeholder="Re-enter password" />
                  <button onClick={() => setShowConfirm(!showConfirm)} tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                    {showConfirm ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Mismatch hint */}
            {pwForm.confirm && pwForm.newPassword !== pwForm.confirm && (
              <p className="text-xs text-yellow-400 mb-3 flex items-center gap-1.5">
                <AlertCircle size={12} /> Passwords don&apos;t match
              </p>
            )}

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handleChangePassword}
                disabled={pwSaving || !pwForm.newPassword || pwForm.newPassword !== pwForm.confirm}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#e5e7eb",
                }}
              >
                {pwSaving ? <Loader size={13} className="animate-spin" /> : <Lock size={13} />}
                {pwSaving ? "Updating…" : "Update Password"}
              </button>

              <AnimatePresence>
                {pwStatus && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    className={`text-sm font-medium flex items-center gap-1.5 ${
                      pwStatus === "success" ? "text-emerald-400"
                      : pwStatus === "mismatch" ? "text-yellow-400"
                      : pwStatus === "short" ? "text-yellow-400"
                      : "text-red-400"
                    }`}
                  >
                    {pwStatus === "success" ? <><CheckCircle size={13} /> Password updated!</>
                     : pwStatus === "mismatch" ? <><AlertCircle size={13} /> Passwords don&apos;t match</>
                     : pwStatus === "short" ? <><AlertCircle size={13} /> Min. 6 characters</>
                     : <><AlertCircle size={13} /> Update failed</>}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Section>
      </motion.div>

    </div>
  );
}

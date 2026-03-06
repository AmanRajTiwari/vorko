import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  TrendingUp,
  Calendar,
  FileText,
  Clock,
  MessageSquare,
  Activity,
  Zap,
  ArrowUpRight,
  Users,
} from "lucide-react";
import { useStudent } from "../../../context/StudentContext";
import { StudentDataContext } from "../../../context/StudentContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useStudentTasks } from "../../../hooks/useStudentTasks";
import { useStudentMeetings } from "../../../hooks/useStudentMeetings";
import { useStudentReports } from "../../../hooks/useStudentReports";
import { useStudentDashboardProject } from "../../../hooks/useStudentDashboardProject";

// ── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut", delay },
});

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, gradient, delay }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className="group relative rounded-2xl p-5 overflow-hidden cursor-default"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
        borderColor: "rgba(255,255,255,0.14)",
      }}
    >
      {/* Subtle gradient glow behind icon */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 blur-2xl"
        style={{ background: gradient }}
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {label}
          </p>
          <div
            className="flex items-center justify-center w-9 h-9 rounded-xl"
            style={{ background: gradient }}
          >
            <Icon size={17} className="text-white" strokeWidth={2} />
          </div>
        </div>
        <p className="text-3xl font-bold text-white tabular-nums">{value}</p>
        <div className="flex items-center gap-1 mt-1.5">
          <ArrowUpRight size={11} className="text-emerald-400" />
          <span className="text-[11px] text-gray-500">Updated now</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Animated progress bar ─────────────────────────────────────────────────────
function ProgressBar({ value, colorFrom = "#00d9ff", colorTo = "#a78bfa", height = 6 }) {
  return (
    <div
      className="w-full rounded-full overflow-hidden"
      style={{ height, background: "rgba(255,255,255,0.07)" }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})` }}
      />
    </div>
  );
}

// ── Activity item ─────────────────────────────────────────────────────────────
function ActivityItem({ icon: Icon, text, time, color }) {
  return (
    <div className="flex items-start gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div
        className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0 mt-0.5"
        style={{ background: color }}
      >
        <Icon size={13} className="text-white" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-300 leading-snug">{text}</p>
        <p className="text-[10px] text-gray-600 mt-0.5">{time}</p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user, profile, isLoading: authLoading, isAuthenticated } = useAuth();
  const {
    project: mockActiveProject,
    tasks: mockActiveTasks,
    vivaData,
    loading: studentLoading,
  } = useStudent();

  const { upcomingMeetings: contextUpcomingMeetings } = useContext(StudentDataContext);

  // Loading
  if (authLoading || studentLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="h-full w-1/2 rounded-full"
            style={{ background: "linear-gradient(90deg,#00d9ff,#a78bfa)" }}
          />
        </div>
      </div>
    );
  }

  if (!user || !isAuthenticated || !profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm">Please log in to view your dashboard.</p>
      </div>
    );
  }

  // Hooks must run after guards
  const { project, loading: projectLoading } = useStudentDashboardProject(user.id);
  const { tasks, stats } = useStudentTasks(user.id);
  const { meetings } = useStudentMeetings(project?.id);
  const { reports } = useStudentReports(user.id);

  const activeProject = project || mockActiveProject;
  const activeTasks = tasks || mockActiveTasks;
  const upcomingMeetings = meetings?.length ? meetings : contextUpcomingMeetings;
  const allReports = reports || [];

  const statsDisplay = [
    {
      label: "Total Tasks",
      value: stats?.total ?? activeTasks.length,
      icon: CheckCircle2,
      gradient: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
    },
    {
      label: "In Progress",
      value: stats?.inProgress ?? activeTasks.filter((t) => t.status === "In Progress").length,
      icon: TrendingUp,
      gradient: "linear-gradient(135deg,#00d9ff,#a78bfa)",
    },
    {
      label: "Meetings",
      value: upcomingMeetings.length,
      icon: Calendar,
      gradient: "linear-gradient(135deg,#8b5cf6,#ec4899)",
    },
    {
      label: "Reports",
      value: allReports.length,
      icon: FileText,
      gradient: "linear-gradient(135deg,#10b981,#059669)",
    },
  ];

  const taskBreakdown = [
    { label: "To Do",       count: stats?.todo       ?? activeTasks.filter((t) => t.status === "To Do").length,       color: "#6b7280" },
    { label: "In Progress", count: stats?.inProgress ?? activeTasks.filter((t) => t.status === "In Progress").length, color: "#00d9ff" },
    { label: "Done",        count: stats?.completed  ?? activeTasks.filter((t) => t.status === "Done").length,        color: "#10b981" },
  ];

  const totalTasks = Math.max(activeTasks.length, 1);
  const progress = stats?.progress ?? activeProject?.progress ?? 0;

  const recentActivity = [
    { icon: Activity, text: "Backend API milestone updated to 70% complete", time: "2 hours ago",   color: "rgba(0,217,255,0.25)" },
    { icon: MessageSquare, text: "Dr. James Mitchell left feedback on your report", time: "5 hours ago",   color: "rgba(167,139,250,0.25)" },
    { icon: Calendar, text: "Weekly Progress Review scheduled for tomorrow",  time: "Yesterday",    color: "rgba(139,92,246,0.25)" },
    { icon: CheckCircle2, text: "Task 'Setup database schema' marked as done", time: "2 days ago",   color: "rgba(16,185,129,0.25)" },
  ];

  const cardStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 16,
  };

  return (
    <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">

      {/* Loading stripe */}
      {projectLoading && (
        <div className="w-full h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="h-full w-1/2 rounded-full"
            style={{ background: "linear-gradient(90deg,transparent,#00d9ff,transparent)" }}
          />
        </div>
      )}

      {/* ── Heading ── */}
      <motion.div {...fadeUp(0)}>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Welcome back,{" "}
          <span style={{ background: "linear-gradient(135deg,#00d9ff,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {(
              profile?.name ||
              user?.user_metadata?.full_name ||
              user?.user_metadata?.name ||
              (user?.email ? user.email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : null) ||
              "Student"
            ).split(" ")[0]}
          </span>{" "}
          👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">Here's your project progress at a glance.</p>
      </motion.div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsDisplay.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.07} />
        ))}
      </div>

      {/* ── Main Grid: Project Progress + Right Panel ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* ── Project Progress (2/3) ── */}
        <motion.div
          {...fadeUp(0.15)}
          className="xl:col-span-2 p-6 space-y-5"
          style={cardStyle}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Project Progress</h2>
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(0,217,255,0.12)", color: "#00d9ff" }}
            >
              {activeProject?.status || "In Progress"}
            </span>
          </div>

          {/* Project name */}
          <div>
            <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">Active Project</p>
            <p className="text-lg font-bold text-white leading-snug">
              {activeProject?.title || activeProject?.name || "No active project"}
            </p>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {activeProject?.description || ""}
            </p>
          </div>

          {/* Overall progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500">Overall Completion</p>
              <p className="text-sm font-bold" style={{ color: "#00d9ff" }}>{progress}%</p>
            </div>
            <ProgressBar value={progress} />
          </div>

          {/* Task breakdown */}
          <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-3">Task Breakdown</p>
            <div className="grid grid-cols-3 gap-3">
              {taskBreakdown.map((tb) => (
                <div key={tb.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{tb.label}</span>
                    <span className="text-xs font-bold text-white">{tb.count}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(tb.count / totalTasks) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ background: tb.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          {activeProject?.milestones?.length > 0 && (
            <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-3">Milestones</p>
              <div className="space-y-2">
                {activeProject.milestones.slice(0, 4).map((m, i) => (
                  <div key={m.id || i} className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        background:
                          m.status === "Completed" ? "#10b981" :
                          m.status === "In Progress" ? "#00d9ff" : "#374151",
                        boxShadow: m.status === "In Progress" ? "0 0 6px #00d9ff" : "none",
                      }}
                    />
                    <p className="text-xs text-gray-400 flex-1 truncate">{m.title}</p>
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        background:
                          m.status === "Completed" ? "rgba(16,185,129,0.12)" :
                          m.status === "In Progress" ? "rgba(0,217,255,0.12)" : "rgba(255,255,255,0.06)",
                        color:
                          m.status === "Completed" ? "#10b981" :
                          m.status === "In Progress" ? "#00d9ff" : "#6b7280",
                      }}
                    >
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team members */}
          {activeProject?.teamMembers?.length > 0 && (
            <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] text-gray-500 uppercase tracking-wider">Team</p>
                <div className="flex items-center gap-1 text-gray-500">
                  <Users size={12} />
                  <span className="text-xs">{activeProject.teamMembers.length} members</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {activeProject.teamMembers.slice(0, 5).map((member, idx) => (
                    <div
                      key={idx}
                      title={member.name}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ring-2 ring-[#0a0e27] flex-shrink-0"
                      style={{
                        background: [
                          "linear-gradient(135deg,#00d9ff,#3b82f6)",
                          "linear-gradient(135deg,#a78bfa,#ec4899)",
                          "linear-gradient(135deg,#10b981,#06b6d4)",
                          "linear-gradient(135deg,#f59e0b,#ef4444)",
                          "linear-gradient(135deg,#8b5cf6,#06b6d4)",
                        ][idx % 5],
                      }}
                    >
                      {member.name.charAt(0)}
                    </div>
                  ))}
                </div>
                {activeProject.teamMembers.length > 5 && (
                  <span className="text-xs text-gray-500">+{activeProject.teamMembers.length - 5} more</span>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Right Panel (1/3) ── */}
        <div className="space-y-4">

          {/* Upcoming Deadline */}
          <motion.div
            {...fadeUp(0.2)}
            className="p-5 rounded-2xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0,217,255,0.08), rgba(167,139,250,0.08))",
              border: "1px solid rgba(0,217,255,0.2)",
            }}
          >
            <div className="absolute inset-0 opacity-5" style={{ background: "radial-gradient(circle at top right, #00d9ff, transparent 60%)" }} />
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#00d9ff" }}>
              ⏰ Upcoming Deadline
            </p>
            <p className="text-base font-bold text-white">
              {activeProject?.upcomingDeadline || "No deadline set"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {activeProject?.milestones?.find((m) => m.status === "In Progress")?.title || "Check milestones tab"}
            </p>
          </motion.div>

          {/* Mentor Info */}
          <motion.div {...fadeUp(0.25)} className="p-5 rounded-2xl" style={cardStyle}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Your Mentor</p>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#a78bfa,#3b82f6)" }}
              >
                {activeProject?.mentor?.name?.charAt(0) || "M"}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {activeProject?.mentor?.name || "Not assigned"}
                </p>
                <p className="text-[11px] text-gray-500 truncate">
                  {activeProject?.mentor?.expertise || "Mentor details unavailable"}
                </p>
              </div>
            </div>
            <button
              className="w-full flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold transition-all duration-150"
              style={{
                background: "rgba(0,217,255,0.1)",
                border: "1px solid rgba(0,217,255,0.2)",
                color: "#00d9ff",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,217,255,0.18)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,217,255,0.1)"; }}
              disabled={!activeProject?.mentor}
            >
              <MessageSquare size={13} strokeWidth={2} />
              Message Mentor
            </button>
          </motion.div>

          {/* Upcoming Meetings */}
          <motion.div {...fadeUp(0.3)} className="p-5 rounded-2xl" style={cardStyle}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">
              Upcoming Meetings
            </p>
            {upcomingMeetings.length === 0 ? (
              <p className="text-xs text-gray-500">No upcoming meetings</p>
            ) : (
              <div className="space-y-2">
                {upcomingMeetings.slice(0, 3).map((m) => (
                  <div
                    key={m.id}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl transition-colors duration-150 cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: "#a78bfa", boxShadow: "0 0 5px #a78bfa" }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white truncate">{m.title}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {m.date} · {m.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Viva Readiness */}
          <motion.div {...fadeUp(0.35)} className="p-5 rounded-2xl" style={cardStyle}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Viva Readiness</p>
              <Zap size={14} className="text-yellow-400" />
            </div>
            <p className="text-2xl font-black text-white mb-2">{vivaData.readinessScore}%</p>
            <ProgressBar
              value={vivaData.readinessScore}
              colorFrom="#f59e0b"
              colorTo="#ef4444"
            />
            <div className="flex items-center gap-1 mt-2">
              <Clock size={11} className="text-gray-600" />
              <p className="text-[10px] text-gray-500">Est. viva: {vivaData.estimatedDate}</p>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div {...fadeUp(0.4)} className="p-5 rounded-2xl" style={cardStyle}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Recent Activity</p>
            <div>
              {recentActivity.map((item, i) => (
                <ActivityItem key={i} {...item} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

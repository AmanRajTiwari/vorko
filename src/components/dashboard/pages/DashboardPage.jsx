import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Calendar,
  Users,
  FileText,
  CheckCircle,
} from "lucide-react";
import { useStudent } from "../../../context/StudentContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useStudentTasks } from "../../../hooks/useStudentTasks";
import { useStudentMeetings } from "../../../hooks/useStudentMeetings";
import { useStudentReports } from "../../../hooks/useStudentReports";
import { useStudentDashboardProject } from "../../../hooks/useStudentDashboardProject";

export default function DashboardPage() {
  const { user, profile, isLoading: authLoading, isAuthenticated } = useAuth();
  const {
    project: mockActiveProject,
    tasks: mockActiveTasks,
    vivaData,
    loading: studentLoading,
  } = useStudent();

  // Loading guard - wait for both auth and student data
  if (authLoading || studentLoading) {
    return (
      <div className="w-full p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-full bg-gradient-to-r from-accent to-accent-purple"
          />
        </div>
      </div>
    );
  }

  // User null guard - redirect or show login message
  if (!user || !isAuthenticated) {
    return (
      <div className="w-full p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-400 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-500">
            Please log in to access your dashboard.
          </p>
        </div>
      </div>
    );
  }

  // Profile null guard
  if (!profile) {
    return (
      <div className="w-full p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-400 mb-2">
            Profile Not Found
          </h2>
          <p className="text-gray-500">
            Unable to load your profile. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  // Fetch real data from Supabase
  const { project, loading: projectLoading } = useStudentDashboardProject(
    user.id,
  );
  const { tasks, stats, loading: tasksLoading } = useStudentTasks(user.id);
  const { meetings, loading: meetingsLoading } = useStudentMeetings(
    project?.id,
  );
  const { reports, loading: reportsLoading } = useStudentReports(user.id);

  // Use real data if available, fallback to mock
  const activeProject = project || mockActiveProject;
  const activeTasks = tasks || mockActiveTasks;
  const upcomingMeetings = meetings || [];
  const allReports = reports || [];

  const stats_display = [
    {
      label: "Total Tasks",
      value: stats?.total || activeTasks.length,
      icon: CheckCircle,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "In Progress",
      value:
        stats?.inProgress ||
        activeTasks.filter((t) => t.status === "In Progress").length,
      icon: TrendingUp,
      color: "from-accent to-accent-purple",
    },
    {
      label: "Meetings",
      value: upcomingMeetings.length,
      icon: Calendar,
      color: "from-purple-500 to-pink-600",
    },
    {
      label: "Reports",
      value: allReports.length,
      icon: FileText,
      color: "from-green-500 to-emerald-600",
    },
  ];

  const taskStats = [
    {
      label: "To Do",
      count:
        stats?.todo || activeTasks.filter((t) => t.status === "To Do").length,
      color: "bg-gray-600",
    },
    {
      label: "In Progress",
      count:
        stats?.inProgress ||
        activeTasks.filter((t) => t.status === "In Progress").length,
      color: "bg-accent",
    },
    {
      label: "Done",
      count:
        stats?.completed ||
        activeTasks.filter((t) => t.status === "Done").length,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 overflow-x-hidden">
      {/* Loading Indicator */}
      {(projectLoading || tasksLoading) && (
        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-full bg-gradient-to-r from-accent to-accent-purple"
          />
        </div>
      )}

      {/* Hero Section - Responsive text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Welcome Back, {profile?.name || "Student"}!
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Here's your project progress at a glance.
        </p>
      </motion.div>

      {/* Quick Stats - Responsive grid, full width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {stats_display.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-effect p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}
                >
                  <Icon size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Main Project Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:col-span-2 glass-effect p-4 sm:p-6 lg:p-8 rounded-xl border border-white/10"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Project Progress
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {/* Project Name */}
            <div>
              <p className="text-xs sm:text-sm text-gray-400 mb-2">
                Active Project
              </p>
              <p className="text-base sm:text-lg font-semibold">
                {activeProject?.title || "No active project"}
              </p>
            </div>

            {/* No Project Message */}
            {!activeProject && (
              <div className="text-center py-8">
                <p className="text-gray-400">No active project</p>
              </div>
            )}

            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <p className="text-xs sm:text-sm text-gray-400">
                  Overall Progress
                </p>
                <p className="text-xs sm:text-sm font-bold text-accent">
                  {stats?.progress || 0}%
                </p>
              </div>
              <div className="w-full h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats?.progress || 0}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-accent to-accent-purple rounded-full"
                />
              </div>
            </div>

            {/* Task Breakdown */}
            <div className="pt-4 sm:pt-6 border-t border-white/10">
              <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                Task Status
              </p>
              <div className="flex gap-3 sm:gap-4">
                {taskStats.map((stat, idx) => (
                  <div key={idx} className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">
                        {stat.label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold">
                        {stat.count}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${stat.color}`}
                        style={{
                          width: `${
                            (stat.count / Math.max(activeTasks.length, 1)) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Size */}
            <div className="pt-4 sm:pt-6 border-t border-white/10">
              <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
                Team
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex -space-x-2">
                  {activeProject?.teamMembers.slice(0, 4).map((member, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-xs font-bold text-dark ring-2 ring-dark"
                    >
                      {member.name.charAt(0)}
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-400">
                  {activeProject?.teamMembers.length} team members
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Deadline & Meetings - Responsive cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full space-y-4 sm:space-y-6"
        >
          {/* Upcoming Deadline */}
          <div className="glass-effect p-4 sm:p-6 rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 to-accent-purple/10">
            <p className="text-xs text-accent mb-2">UPCOMING DEADLINE</p>
            <p className="text-base sm:text-lg font-bold mb-1">
              {activeProject?.upcomingDeadline}
            </p>
            <p className="text-xs sm:text-sm text-gray-400">
              {activeProject?.milestones.find((m) => m.status === "In Progress")
                ?.title || "Check milestones"}
            </p>
          </div>

          {/* Mentor Info */}
          <div className="glass-effect p-4 sm:p-6 rounded-xl border border-white/10">
            <p className="text-xs text-gray-400 mb-2 sm:mb-3">YOUR MENTOR</p>
            <p className="text-sm sm:text-base font-bold mb-1">
              {activeProject?.mentor?.name || "Not assigned"}
            </p>
            <p className="text-xs text-gray-400 mb-3 sm:mb-4">
              {activeProject?.mentor?.expertise || "Mentor details unavailable"}
            </p>
            <motion.button
              className="w-full px-3 sm:px-4 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors text-xs sm:text-sm font-semibold min-h-[44px]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!activeProject?.mentor}
            >
              Message Mentor
            </motion.button>
          </div>

          {/* Upcoming Meetings */}
          <div className="glass-effect p-4 sm:p-6 rounded-xl border border-white/10">
            <p className="text-xs text-gray-400 mb-3 sm:mb-4">
              UPCOMING MEETINGS
            </p>
            {upcomingMeetings.length === 0 ? (
              <p className="text-xs sm:text-sm text-gray-400">
                No upcoming meetings
              </p>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {upcomingMeetings.slice(0, 2).map((meeting) => (
                  <motion.div
                    key={meeting.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-2 sm:p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <p className="text-xs sm:text-sm font-semibold">
                      {meeting.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {meeting.date} at {meeting.time}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Viva Readiness */}
          <div className="glass-effect p-4 sm:p-6 rounded-xl border border-white/10">
            <p className="text-xs text-gray-400 mb-2 sm:mb-3">VIVA READINESS</p>
            <p className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
              {vivaData.readinessScore}%
            </p>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${vivaData.readinessScore}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-accent to-accent-purple"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 sm:mt-3">
              Estimated viva: {vivaData.estimatedDate}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

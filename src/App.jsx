import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import Problem from "./components/sections/Problem";
import HowItWorks from "./components/sections/HowItWorks";
import Collaboration from "./components/sections/Collaboration";
import MentorViva from "./components/sections/MentorViva";
import Testimonials from "./components/sections/Testimonials";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import MentorDashboard from "./components/mentor-dashboard/MentorDashboard";
import ProjectsPage from "./components/mentor-dashboard/pages/ProjectsPage";
import ReviewsPage from "./components/mentor-dashboard/pages/ReviewsPage";
import MeetingsPage from "./components/mentor-dashboard/pages/MeetingsPage";
import ReportsPage from "./components/mentor-dashboard/pages/ReportsPage";
import VivaReadinessPage from "./components/mentor-dashboard/pages/VivaReadinessPage";
import SettingsPage from "./components/mentor-dashboard/pages/SettingsPage";
import { DataProvider } from "./context/DataContext";
import { StudentDataProvider } from "./context/StudentContext";
import StudentLayout from "./components/dashboard/StudentLayout";
import DashboardPage from "./components/dashboard/pages/DashboardPage";
import StudentProjectsPage from "./components/dashboard/pages/ProjectsPage";
import TasksPage from "./components/dashboard/pages/TasksPage";
import TeamPage from "./components/dashboard/pages/TeamPage";
import StudentMeetingsPage from "./components/dashboard/pages/MeetingsPage";
import StudentReportsPage from "./components/dashboard/pages/ReportsPage";
import VivaModePages from "./components/dashboard/pages/VivaModePages";
import StudentSettingsPage from "./components/dashboard/pages/SettingsPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AppLoader } from "./components/AppLoader";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";

function LandingPage({ onNavigate }) {
  return (
    <div className="w-full overflow-x-hidden bg-dark">
      {/* Background gradient blobs - constrained */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent/10 to-accent-purple/10 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-tr from-accent-purple/10 to-accent-blue/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-tl from-accent-blue/10 to-accent/10 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar onNavigate={onNavigate} />
        <Hero onNavigate={onNavigate} />
        <Problem />
        <HowItWorks />
        <Collaboration />
        <MentorViva />
        <Testimonials />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage onNavigate={(page) => {}} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLayout>
              <DashboardPage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/projects"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLayout>
              <StudentProjectsPage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/tasks"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLayout>
              <TasksPage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/team"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLayout>
              <TeamPage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/meetings"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLayout>
              <StudentMeetingsPage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/reports"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLayout>
              <StudentReportsPage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/viva-mode"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLayout>
              <VivaModePages />
            </StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/settings"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLayout>
              <StudentSettingsPage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />

      {/* Protected Mentor Routes */}
      <Route
        path="/mentor/dashboard"
        element={
          <ProtectedRoute allowedRole="mentor">
            <MentorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentor/projects"
        element={
          <ProtectedRoute allowedRole="mentor">
            <ProjectsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentor/reviews"
        element={
          <ProtectedRoute allowedRole="mentor">
            <ReviewsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentor/meetings"
        element={
          <ProtectedRoute allowedRole="mentor">
            <MeetingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentor/reports"
        element={
          <ProtectedRoute allowedRole="mentor">
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentor/viva-readiness"
        element={
          <ProtectedRoute allowedRole="mentor">
            <VivaReadinessPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentor/settings"
        element={
          <ProtectedRoute allowedRole="mentor">
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Legacy Dashboard Route - Redirect to login */}
      <Route path="/dashboard" element={<Navigate to="/login" replace />} />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLoader>
          <DataProvider>
            <StudentDataProvider>
              <AppRoutes />
            </StudentDataProvider>
          </DataProvider>
        </AppLoader>
      </AuthProvider>
    </Router>
  );
}

export default App;

import React, { createContext, useContext, useState, useCallback } from "react";

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
};

const MOCK_PROJECTS = [
  {
    id: 1,
    name: "AI Chatbot Assistant",
    status: "In Progress",
    progress: 65,
    description: "Building an intelligent customer support chatbot",
    team: ["Alice Johnson", "Bob Smith", "Carol White"],
    teamCount: 3,
    startDate: "2025-09-01",
    deadline: "2026-02-15",
    priority: "High",
    category: "AI/ML",
    milestones: [
      { id: 1, name: "API Integration", completed: true },
      { id: 2, name: "NLP Training", completed: true },
      { id: 3, name: "UI Development", completed: false },
      { id: 4, name: "Testing & QA", completed: false },
    ],
    contributionStats: {
      Alice: 45,
      Bob: 35,
      Carol: 20,
    },
    reviews: [
      {
        id: 1,
        studentName: "Alice Johnson",
        status: "pending",
        submittedDate: "2025-12-20",
      },
      {
        id: 2,
        studentName: "Bob Smith",
        status: "approved",
        submittedDate: "2025-12-18",
      },
    ],
  },
  {
    id: 2,
    name: "Mobile App Redesign",
    status: "Planning",
    progress: 30,
    description: "Complete redesign of existing mobile application UI/UX",
    team: ["David Brown", "Emma Davis"],
    teamCount: 2,
    startDate: "2025-10-01",
    deadline: "2026-03-30",
    priority: "Medium",
    category: "Mobile",
    milestones: [
      { id: 1, name: "Wireframing", completed: false },
      { id: 2, name: "Design System", completed: false },
      { id: 3, name: "Development", completed: false },
    ],
    contributionStats: {
      David: 50,
      Emma: 50,
    },
    reviews: [
      {
        id: 1,
        studentName: "David Brown",
        status: "pending",
        submittedDate: "2025-12-22",
      },
    ],
  },
  {
    id: 3,
    name: "Data Analytics Dashboard",
    status: "Completed",
    progress: 100,
    description: "Real-time analytics dashboard for business intelligence",
    team: ["Frank Miller", "Grace Lee", "Henry Chen"],
    teamCount: 3,
    startDate: "2025-06-01",
    deadline: "2025-12-01",
    priority: "High",
    category: "Data",
    milestones: [
      { id: 1, name: "Database Setup", completed: true },
      { id: 2, name: "Backend APIs", completed: true },
      { id: 3, name: "Frontend Charts", completed: true },
      { id: 4, name: "Deployment", completed: true },
    ],
    contributionStats: {
      Frank: 40,
      Grace: 35,
      Henry: 25,
    },
    reviews: [],
  },
];

const MOCK_MEETINGS = [
  {
    id: 1,
    title: "AI Chatbot Team Standup",
    date: "2026-01-05",
    time: "10:00 AM",
    duration: "30 mins",
    students: ["Alice Johnson", "Bob Smith", "Carol White"],
    status: "upcoming",
    notes: "",
    meetingLink: "https://meet.google.com/example1",
  },
  {
    id: 2,
    title: "Mobile App Design Review",
    date: "2026-01-07",
    time: "2:00 PM",
    duration: "45 mins",
    students: ["David Brown", "Emma Davis"],
    status: "upcoming",
    notes: "",
    meetingLink: "https://meet.google.com/example2",
  },
  {
    id: 3,
    title: "Analytics Dashboard Wrap-up",
    date: "2025-12-20",
    time: "3:00 PM",
    duration: "1 hour",
    students: ["Frank Miller", "Grace Lee", "Henry Chen"],
    status: "completed",
    notes: "Project completed successfully. Discussed future enhancements.",
    meetingLink: "https://meet.google.com/example3",
  },
];

const MOCK_REVIEWS = [
  {
    id: 1,
    projectId: 1,
    studentName: "Alice Johnson",
    submissionDate: "2025-12-20",
    status: "pending",
    type: "Milestone",
    description: "Submitted NLP training phase completion",
    content: "Training complete with 92% accuracy rate",
  },
  {
    id: 2,
    projectId: 1,
    studentName: "Bob Smith",
    submissionDate: "2025-12-18",
    status: "approved",
    type: "Code Review",
    description: "API integration code submission",
    content: "API endpoints implemented correctly",
    feedback: "Great work! Minor refactoring suggestions in comments.",
  },
  {
    id: 3,
    projectId: 2,
    studentName: "David Brown",
    submissionDate: "2025-12-22",
    status: "pending",
    type: "Design Review",
    description: "Initial wireframes for redesign",
    content: "20 wireframes covering main user flows",
  },
];

const MOCK_REPORTS = [
  {
    id: 1,
    projectId: 1,
    name: "Q4 Progress Report - AI Chatbot",
    generatedDate: "2025-12-22",
    status: "Available",
    type: "Progress",
    summary:
      "Project is 65% complete. Team is on track. NLP training successful.",
    fileSize: "2.4 MB",
  },
  {
    id: 2,
    projectId: 3,
    name: "Final Report - Data Analytics",
    generatedDate: "2025-12-01",
    status: "Available",
    type: "Final",
    summary:
      "Project completed successfully. All objectives met. Team performed excellently.",
    fileSize: "3.1 MB",
  },
  {
    id: 3,
    projectId: 2,
    name: "Planning Phase Report - Mobile App",
    generatedDate: "2025-12-15",
    status: "Available",
    type: "Phase",
    summary:
      "Planning phase completed. Design system framework defined. Ready for development.",
    fileSize: "1.8 MB",
  },
];

const MOCK_VIVA_DATA = {
  1: {
    projectId: 1,
    readinessScore: 78,
    checklist: [
      { id: 1, item: "Documentation Complete", completed: true },
      { id: 2, item: "Code Quality Review", completed: true },
      { id: 3, item: "Test Coverage > 80%", completed: true },
      { id: 4, item: "Performance Optimization", completed: false },
      { id: 5, item: "Deployment Ready", completed: false },
      { id: 6, item: "Demo Prepared", completed: false },
    ],
    estimatedReadyDate: "2026-02-01",
    recommendations: [
      "Focus on performance optimization",
      "Prepare interactive demo",
      "Document edge cases",
    ],
  },
  2: {
    projectId: 2,
    readinessScore: 45,
    checklist: [
      { id: 1, item: "Documentation Complete", completed: false },
      { id: 2, item: "Code Quality Review", completed: false },
      { id: 3, item: "Test Coverage > 80%", completed: false },
      { id: 4, item: "Performance Optimization", completed: false },
      { id: 5, item: "Deployment Ready", completed: false },
      { id: 6, item: "Demo Prepared", completed: false },
    ],
    estimatedReadyDate: "2026-03-15",
    recommendations: [
      "Complete core development",
      "Increase test coverage",
      "Begin documentation",
    ],
  },
  3: {
    projectId: 3,
    readinessScore: 95,
    checklist: [
      { id: 1, item: "Documentation Complete", completed: true },
      { id: 2, item: "Code Quality Review", completed: true },
      { id: 3, item: "Test Coverage > 80%", completed: true },
      { id: 4, item: "Performance Optimization", completed: true },
      { id: 5, item: "Deployment Ready", completed: true },
      { id: 6, item: "Demo Prepared", completed: true },
    ],
    estimatedReadyDate: "2025-12-15",
    recommendations: ["Project ready for viva", "Archive after presentation"],
  },
};

const MOCK_MENTOR = {
  id: 1,
  name: "Dr. Sarah Williams",
  email: "sarah.williams@vorko.com",
  department: "Computer Science",
  specialization: "AI & Machine Learning",
  yearsOfExperience: 8,
  phone: "+1-555-123-4567",
  bio: "Passionate about mentoring next generation of developers",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  preferences: {
    emailNotifications: true,
    meetingReminders: true,
    weeklyReports: false,
    projectAlerts: true,
  },
};

export function DataProvider({ children }) {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [meetings, setMeetings] = useState(MOCK_MEETINGS);
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [reports] = useState(MOCK_REPORTS);
  const [mentor, setMentor] = useState(MOCK_MENTOR);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((message, duration = 3000) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), duration);
  }, []);

  // Project actions
  const getProjectById = useCallback(
    (id) => {
      return projects.find((p) => p.id === parseInt(id));
    },
    [projects]
  );

  const updateProjectProgress = useCallback(
    (projectId, newProgress) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, progress: Math.min(100, newProgress) }
            : p
        )
      );
      showToast("Project progress updated");
    },
    [showToast]
  );

  // Review actions
  const approveReview = useCallback(
    (reviewId) => {
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, status: "approved" } : r))
      );
      showToast("Review approved ✓");
    },
    [showToast]
  );

  const rejectReview = useCallback(
    (reviewId, feedback) => {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId ? { ...r, status: "rejected", feedback } : r
        )
      );
      showToast("Review rejected with feedback");
    },
    [showToast]
  );

  const requestChanges = useCallback(
    (reviewId) => {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId ? { ...r, status: "changes-requested" } : r
        )
      );
      showToast("Changes requested from student");
    },
    [showToast]
  );

  // Meeting actions
  const addMeetingNotes = useCallback(
    (meetingId, notes) => {
      setMeetings((prev) =>
        prev.map((m) => (m.id === meetingId ? { ...m, notes } : m))
      );
      showToast("Meeting notes saved");
    },
    [showToast]
  );

  const getMeetingById = useCallback(
    (id) => {
      return meetings.find((m) => m.id === parseInt(id));
    },
    [meetings]
  );

  // Report actions
  const getProjectReports = useCallback(
    (projectId) => {
      return reports.filter((r) => r.projectId === projectId);
    },
    [reports]
  );

  const downloadReport = useCallback(
    (reportId) => {
      showToast("Downloading report...");
      // Simulate download
      setTimeout(() => {
        showToast("Report downloaded successfully");
      }, 1000);
    },
    [showToast]
  );

  // Viva readiness actions
  const updateVivaChecklist = useCallback(
    (projectId, itemId, completed) => {
      // This would update in a real app
      showToast(
        `Viva checklist item ${completed ? "completed" : "uncompleted"}`
      );
    },
    [showToast]
  );

  const generateVivaSummary = useCallback(
    (projectId) => {
      showToast("Generating viva summary...");
      setTimeout(() => {
        showToast("Viva summary generated successfully");
      }, 1500);
    },
    [showToast]
  );

  // Mentor profile actions
  const updateMentorProfile = useCallback(
    (updates) => {
      setMentor((prev) => ({ ...prev, ...updates }));
      showToast("Profile updated successfully");
    },
    [showToast]
  );

  const updatePreferences = useCallback(
    (preferences) => {
      setMentor((prev) => ({
        ...prev,
        preferences: { ...prev.preferences, ...preferences },
      }));
      showToast("Preferences updated");
    },
    [showToast]
  );

  const value = {
    // Data
    projects,
    meetings,
    reviews,
    reports,
    mentor,
    toastMessage,

    // Project methods
    getProjectById,
    updateProjectProgress,

    // Review methods
    approveReview,
    rejectReview,
    requestChanges,
    getReviewsByProjectId: (projectId) =>
      reviews.filter((r) => r.projectId === projectId),
    getPendingReviews: () => reviews.filter((r) => r.status === "pending"),

    // Meeting methods
    addMeetingNotes,
    getMeetingById,
    getUpcomingMeetings: () => meetings.filter((m) => m.status === "upcoming"),
    getPastMeetings: () => meetings.filter((m) => m.status === "completed"),

    // Report methods
    getProjectReports,
    downloadReport,
    getAllReports: () => reports,

    // Viva methods
    getVivaData: (projectId) => MOCK_VIVA_DATA[projectId] || null,
    updateVivaChecklist,
    generateVivaSummary,

    // Mentor methods
    updateMentorProfile,
    updatePreferences,

    // Utils
    showToast,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

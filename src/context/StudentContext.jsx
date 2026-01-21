import React, { createContext, useState, useCallback, useContext } from "react";
import { useAuth } from "../contexts/AuthContext";

export const StudentDataContext = createContext();

export function StudentDataProvider({ children }) {
  // STUDENT DATA
  const [student, setStudent] = useState({
    id: "STU001",
    name: "Alex Johnson",
    email: "alex.johnson@college.edu",
    phone: "+1 (555) 123-4567",
    rollNumber: "20CS123",
    department: "Computer Science",
    semester: "7",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    bio: "Passionate about web development and AI",
    joinDate: "2023-08-15",
  });

  // ACTIVE PROJECT
  const [activeProjectId, setActiveProjectId] = useState("PROJ001");

  // PROJECTS
  const [projects, setProjects] = useState([
    {
      id: "PROJ001",
      name: "AI-Powered Chat Application",
      description:
        "Building an intelligent chatbot using NLP and machine learning",
      status: "In Progress",
      progress: 65,
      startDate: "2025-09-01",
      endDate: "2026-04-30",
      teamMembers: [
        { id: "STU001", name: "Alex Johnson", role: "Lead Developer" },
        { id: "STU002", name: "Emma Davis", role: "UI/UX Designer" },
        { id: "STU003", name: "Ryan Smith", role: "Backend Developer" },
        { id: "STU004", name: "Sarah Wilson", role: "ML Specialist" },
      ],
      mentor: {
        id: "MEN001",
        name: "Dr. James Mitchell",
        email: "james.mitchell@college.edu",
        expertise: "AI & Machine Learning",
      },
      milestones: [
        {
          id: "MIL001",
          title: "Project Setup & Architecture",
          status: "Completed",
          dueDate: "2025-10-15",
        },
        {
          id: "MIL002",
          title: "Backend API Development",
          status: "In Progress",
          dueDate: "2026-01-15",
        },
        {
          id: "MIL003",
          title: "Frontend Implementation",
          status: "Pending",
          dueDate: "2026-02-28",
        },
        {
          id: "MIL004",
          title: "Testing & Deployment",
          status: "Pending",
          dueDate: "2026-03-31",
        },
      ],
      repository: "https://github.com/project/ai-chat-app",
      upcomingDeadline: "2026-01-15",
    },
    {
      id: "PROJ002",
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      status: "Planning",
      progress: 15,
      startDate: "2025-11-01",
      endDate: "2026-05-31",
      teamMembers: [
        { id: "STU005", name: "Michael Chen", role: "Project Manager" },
        { id: "STU001", name: "Alex Johnson", role: "Full Stack Developer" },
      ],
      mentor: {
        id: "MEN002",
        name: "Prof. Sarah Khan",
        email: "sarah.khan@college.edu",
        expertise: "Web Development",
      },
      milestones: [
        {
          id: "MIL005",
          title: "Requirements & Design",
          status: "In Progress",
          dueDate: "2026-01-30",
        },
      ],
      repository: "https://github.com/project/ecommerce",
      upcomingDeadline: "2026-01-30",
    },
  ]);

  // TASKS
  const [tasks, setTasks] = useState([
    {
      id: "TASK001",
      title: "Setup project environment and dependencies",
      description: "Initialize Node.js project and install required packages",
      projectId: "PROJ001",
      assignee: { id: "STU001", name: "Alex Johnson" },
      status: "Done",
      priority: "High",
      dueDate: "2025-10-01",
      createdDate: "2025-09-15",
      tags: ["backend", "setup"],
    },
    {
      id: "TASK002",
      title: "Design API endpoints documentation",
      description: "Document all REST API endpoints with Swagger",
      projectId: "PROJ001",
      assignee: { id: "STU003", name: "Ryan Smith" },
      status: "In Progress",
      priority: "High",
      dueDate: "2025-12-20",
      createdDate: "2025-11-01",
      tags: ["backend", "documentation"],
    },
    {
      id: "TASK003",
      title: "Create UI mockups for main dashboard",
      description: "Design desktop and mobile mockups in Figma",
      projectId: "PROJ001",
      assignee: { id: "STU002", name: "Emma Davis" },
      status: "Done",
      priority: "High",
      dueDate: "2025-11-15",
      createdDate: "2025-10-20",
      tags: ["design", "ui"],
    },
    {
      id: "TASK004",
      title: "Implement NLP preprocessing module",
      description: "Build text cleaning and tokenization functions",
      projectId: "PROJ001",
      assignee: { id: "STU004", name: "Sarah Wilson" },
      status: "In Progress",
      priority: "Medium",
      dueDate: "2026-01-30",
      createdDate: "2025-12-01",
      tags: ["ai", "ml"],
    },
    {
      id: "TASK005",
      title: "Setup database schema",
      description: "Design and implement PostgreSQL database schema",
      projectId: "PROJ001",
      assignee: { id: "STU001", name: "Alex Johnson" },
      status: "In Progress",
      priority: "High",
      dueDate: "2026-01-10",
      createdDate: "2025-12-15",
      tags: ["database", "backend"],
    },
    {
      id: "TASK006",
      title: "User authentication integration",
      description: "Implement JWT-based authentication",
      projectId: "PROJ002",
      assignee: { id: "STU001", name: "Alex Johnson" },
      status: "To Do",
      priority: "High",
      dueDate: "2026-02-28",
      createdDate: "2025-12-20",
      tags: ["auth", "security"],
    },
  ]);

  // MEETINGS
  const [meetings, setMeetings] = useState([
    {
      id: "MEET001",
      title: "Project Kickoff Meeting",
      description: "Initial project discussion and team alignment",
      projectId: "PROJ001",
      date: "2025-09-20",
      time: "10:00 AM",
      duration: 60,
      status: "Completed",
      attendees: [
        { id: "STU001", name: "Alex Johnson" },
        { id: "STU002", name: "Emma Davis" },
        { id: "STU003", name: "Ryan Smith" },
        { id: "STU004", name: "Sarah Wilson" },
        { id: "MEN001", name: "Dr. James Mitchell" },
      ],
      notes:
        "Team roles assigned. Architecture discussed. Weekly sync scheduled for Mondays at 3 PM.",
      meetingLink: "https://zoom.us/meeting/12345",
    },
    {
      id: "MEET002",
      title: "Weekly Progress Review",
      description: "Review project progress and blockers",
      projectId: "PROJ001",
      date: "2025-12-22",
      time: "3:00 PM",
      duration: 45,
      status: "Upcoming",
      attendees: [
        { id: "STU001", name: "Alex Johnson" },
        { id: "STU002", name: "Emma Davis" },
        { id: "STU003", name: "Ryan Smith" },
        { id: "STU004", name: "Sarah Wilson" },
        { id: "MEN001", name: "Dr. James Mitchell" },
      ],
      notes: "",
      meetingLink: "https://zoom.us/meeting/67890",
    },
    {
      id: "MEET003",
      title: "Mentor One-on-One",
      description: "Individual feedback and guidance",
      projectId: "PROJ001",
      date: "2025-12-25",
      time: "2:00 PM",
      duration: 30,
      status: "Upcoming",
      attendees: [
        { id: "STU001", name: "Alex Johnson" },
        { id: "MEN001", name: "Dr. James Mitchell" },
      ],
      notes: "",
      meetingLink: "https://zoom.us/meeting/11111",
    },
    {
      id: "MEET004",
      title: "Mid-semester Review",
      description: "Project evaluation and suggestions",
      projectId: "PROJ001",
      date: "2025-12-10",
      time: "11:00 AM",
      duration: 60,
      status: "Completed",
      attendees: [
        { id: "STU001", name: "Alex Johnson" },
        { id: "STU002", name: "Emma Davis" },
        { id: "STU003", name: "Ryan Smith" },
        { id: "STU004", name: "Sarah Wilson" },
        { id: "MEN001", name: "Dr. James Mitchell" },
      ],
      notes:
        "Good progress so far. Need to accelerate backend development. ML model needs fine-tuning.",
      meetingLink: "https://zoom.us/meeting/22222",
    },
  ]);

  // REPORTS
  const [reports, setReports] = useState([
    {
      id: "REP001",
      projectId: "PROJ001",
      title: "Mid-Semester Report",
      type: "Progress",
      submissionDate: "2025-12-10",
      status: "Approved",
      mentorFeedback:
        "Excellent progress. Keep up the momentum on backend development.",
      file: "mid-semester-report.pdf",
      sections: [
        {
          title: "Project Overview",
          content:
            "Building an AI-powered chat application with NLP capabilities.",
        },
        {
          title: "Work Completed",
          content:
            "Completed project setup, API design, and initial database schema.",
        },
        {
          title: "Current Challenges",
          content:
            "ML model training taking longer than expected. Need optimization.",
        },
        {
          title: "Next Steps",
          content:
            "Focus on backend optimization and frontend development in parallel.",
        },
      ],
    },
    {
      id: "REP002",
      projectId: "PROJ001",
      title: "Progress Report - January 2026",
      type: "Progress",
      submissionDate: "2026-01-05",
      status: "Pending",
      mentorFeedback: "",
      file: null,
      sections: [],
    },
  ]);

  // VIVA DATA
  const [vivaData, setVivaData] = useState({
    projectId: "PROJ001",
    estimatedDate: "2026-04-15",
    readinessScore: 62,
    completionStatus: {
      documentation: { completed: true, percentage: 100 },
      codeQuality: { completed: true, percentage: 85 },
      testing: { completed: false, percentage: 40 },
      deployment: { completed: false, percentage: 0 },
      presentation: { completed: false, percentage: 30 },
    },
    timeline: [
      {
        id: "TL001",
        date: "2025-09-20",
        event: "Project Kickoff",
        contributor: "Team",
        description: "Project officially started",
      },
      {
        id: "TL002",
        date: "2025-10-15",
        event: "Architecture Finalized",
        contributor: "Alex Johnson",
        description: "System architecture approved by mentor",
      },
      {
        id: "TL003",
        date: "2025-11-20",
        event: "API Development Started",
        contributor: "Ryan Smith",
        description: "REST API implementation began",
      },
      {
        id: "TL004",
        date: "2025-12-10",
        event: "Mid-Semester Review",
        contributor: "Team + Mentor",
        description: "Project evaluated. 65% completion",
      },
      {
        id: "TL005",
        date: "2026-01-15",
        event: "Backend Milestone",
        contributor: "Ryan Smith + Alex Johnson",
        description: "Backend API fully developed",
      },
    ],
    contributionProof: [
      {
        contributor: "Alex Johnson",
        role: "Lead Developer",
        percentage: 35,
        commits: 127,
        highlights: [
          "Project architecture design",
          "Database schema optimization",
          "API integration",
        ],
      },
      {
        contributor: "Emma Davis",
        role: "UI/UX Designer",
        percentage: 20,
        commits: 45,
        highlights: [
          "Dashboard UI design",
          "Mobile responsiveness",
          "Design system creation",
        ],
      },
      {
        contributor: "Ryan Smith",
        role: "Backend Developer",
        percentage: 30,
        commits: 98,
        highlights: [
          "REST API development",
          "Database management",
          "Authentication system",
        ],
      },
      {
        contributor: "Sarah Wilson",
        role: "ML Specialist",
        percentage: 15,
        commits: 52,
        highlights: [
          "ML model development",
          "NLP preprocessing",
          "Model optimization",
        ],
      },
    ],
  });

  // NOTIFICATIONS
  const [notifications, setNotifications] = useState([
    {
      id: "NOTIF001",
      type: "deadline",
      title: "Upcoming Deadline",
      message: "Backend API Development milestone due in 5 days",
      date: "2026-01-10",
      read: false,
      projectId: "PROJ001",
    },
    {
      id: "NOTIF002",
      type: "meeting",
      title: "Meeting Reminder",
      message: "Weekly Progress Review in 2 hours",
      date: "2025-12-22",
      read: true,
      projectId: "PROJ001",
    },
    {
      id: "NOTIF003",
      type: "feedback",
      title: "Mentor Feedback",
      message: "Dr. James has left feedback on your report",
      date: "2025-12-15",
      read: false,
      projectId: "PROJ001",
    },
  ]);

  // SETTINGS
  const [settings, setSettings] = useState({
    theme: "dark",
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true,
    twoFactorAuth: false,
    privacyLevel: "team", // 'private', 'team', 'public'
  });

  // ==================== TASK ACTIONS ====================
  const updateTaskStatus = useCallback((taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }, []);

  const addTask = useCallback((taskData) => {
    const newTask = {
      id: `TASK${Date.now()}`,
      createdDate: new Date().toISOString().split("T")[0],
      ...taskData,
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }, []);

  // ==================== MEETING ACTIONS ====================
  const addMeetingNotes = useCallback((meetingId, notes) => {
    setMeetings((prev) =>
      prev.map((meeting) =>
        meeting.id === meetingId ? { ...meeting, notes } : meeting
      )
    );
  }, []);

  const addMeeting = useCallback((meetingData) => {
    const newMeeting = {
      id: `MEET${Date.now()}`,
      ...meetingData,
    };
    setMeetings((prev) => [newMeeting, ...prev]);
  }, []);

  // ==================== PROJECT ACTIONS ====================
  const switchActiveProject = useCallback((projectId) => {
    setActiveProjectId(projectId);
  }, []);

  const updateProjectProgress = useCallback((projectId, progress) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, progress } : project
      )
    );
  }, []);

  // ==================== REPORT ACTIONS ====================
  const submitReport = useCallback((reportData) => {
    const newReport = {
      id: `REP${Date.now()}`,
      submissionDate: new Date().toISOString().split("T")[0],
      status: "Pending",
      mentorFeedback: "",
      ...reportData,
    };
    setReports((prev) => [newReport, ...prev]);
  }, []);

  const updateReportStatus = useCallback((reportId, status, feedback) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === reportId
          ? { ...report, status, mentorFeedback: feedback }
          : report
      )
    );
  }, []);

  // ==================== STUDENT ACTIONS ====================
  const updateStudentProfile = useCallback((updates) => {
    setStudent((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateSettings = useCallback((updates) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  // ==================== NOTIFICATION ACTIONS ====================
  const markNotificationAsRead = useCallback((notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  }, []);

  // Get active project
  const activeProject = projects.find((p) => p.id === activeProjectId);

  // Get tasks for active project
  const activeTasks = tasks.filter((t) => t.projectId === activeProjectId);

  // Get meetings for active project
  const activeMeetings = meetings.filter(
    (m) => m.projectId === activeProjectId
  );

  // Get upcoming meetings
  const upcomingMeetings = activeMeetings.filter(
    (m) => m.status === "Upcoming"
  );

  const value = {
    // Data
    student,
    projects,
    activeProject,
    activeProjectId,
    tasks,
    activeTasks,
    meetings,
    activeMeetings,
    upcomingMeetings,
    reports,
    vivaData,
    notifications,
    settings,

    // Task actions
    updateTaskStatus,
    addTask,
    deleteTask,

    // Meeting actions
    addMeetingNotes,
    addMeeting,

    // Project actions
    switchActiveProject,
    updateProjectProgress,

    // Report actions
    submitReport,
    updateReportStatus,

    // Student actions
    updateStudentProfile,
    updateSettings,

    // Notification actions
    markNotificationAsRead,
  };

  return (
    <StudentDataContext.Provider value={value}>
      {children}
    </StudentDataContext.Provider>
  );
}

// Custom hook to use student context
export function useStudent() {
  const context = useContext(StudentDataContext);
  const { profile, isLoading: authLoading } = useAuth();

  if (!context) {
    throw new Error("useStudent must be used within StudentDataProvider");
  }

  // Combine loading states
  const loading = authLoading || false; // Add any other loading states if needed

  return {
    profile,
    project: context.activeProject,
    tasks: context.activeTasks,
    vivaData: context.vivaData,
    loading,
  };
}

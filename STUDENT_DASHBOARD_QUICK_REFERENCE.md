# Student Dashboard - Quick Reference Guide

## 🎯 Quick Start

### Accessing the Student Dashboard

1. Go to landing page: `http://localhost:5173/`
2. Click **"Student Dashboard"** button in the navbar
3. OR navigate directly to: `http://localhost:5173/student/dashboard`

## 📖 Route Map

| Route                | Page      | Purpose                                                      |
| -------------------- | --------- | ------------------------------------------------------------ |
| `/student/dashboard` | Dashboard | Overview of projects, tasks, meetings, and viva readiness    |
| `/student/projects`  | Projects  | View and manage all projects with milestones                 |
| `/student/tasks`     | Tasks     | Create and manage tasks with status tracking                 |
| `/student/team`      | Team      | View team members and contribution breakdown                 |
| `/student/meetings`  | Meetings  | Upcoming meetings and notes management                       |
| `/student/reports`   | Reports   | Submit and track project reports                             |
| `/student/viva-mode` | Viva Mode | Viva preparation with readiness, timeline, and contributions |
| `/student/settings`  | Settings  | Profile and preference management                            |

## 🎮 Interactive Features

### Dashboard Page

- View active project progress
- See upcoming deadline
- Check task statistics
- View mentor information
- Access viva readiness score

### Tasks Page

- **Add Task**: Click "+ Add Task" button → Fill form → Submit
- **Filter Tasks**: Use filter buttons (All Tasks, To Do, In Progress, Done)
- **Change Status**: Click the status icon to cycle through statuses
- **Delete Task**: Click trash icon to remove task
- **Task Stats**: View counts for each status at the top

### Projects Page

- **Click Project Card**: See full project details including milestones
- **View Milestones**: Check milestone status and due dates
- **Switch Project**: Click different project cards to view details
- **Repository Link**: Access GitHub/repository links

### Team Page

- **View Team Members**: See roles and contribution percentages
- **Contribution Breakdown**: Visual chart of team contributions
- **Mentor Section**: Separate mentor profile at the top
- **Key Highlights**: See what each member contributed

### Meetings Page

- **Upcoming Meetings**: Join meeting buttons for upcoming events
- **Past Meetings**: View meeting history
- **Add Notes**: Click meeting to open modal and add meeting notes
- **Schedule Meeting**: "Schedule Meeting" button for future implementation

### Reports Page

- **Submit Report**: Click "Submit Report" → Fill form → Submit
- **View Status**: See approval status (Approved, Pending, Rejected)
- **Read Feedback**: View mentor feedback in report details
- **Download**: Click download icon to access report files

### Viva Mode Page

- **Readiness Tab**: Overall score and category breakdown with checklist
- **Timeline Tab**: Visual project timeline with key events
- **Contributions Tab**: Team contributions and highlights
- **Switch Tabs**: Click tab headers to navigate

### Settings Page

- **Edit Profile**: Update personal information and save
- **Notification Preferences**: Toggle email, push, weekly reports, 2FA
- **Appearance**: Select light/dark theme
- **Privacy**: Set privacy level (Private, Team, Public)
- **Security**: Change password, view sessions, download data

## 📊 Mock Data Quick Reference

### Projects

- **Project 1**: AI-Powered Chat Application (65% complete, 4 team members)
- **Project 2**: E-Commerce Platform (15% complete, 2 team members)

### Tasks Count

- **To Do**: 1 task
- **In Progress**: 3 tasks
- **Done**: 2 tasks

### Team Size

- Primary project has 4 team members
- Mentor: Dr. James Mitchell

### Viva Readiness

- Current Score: 62%
- Estimated Viva: 2026-04-15

## 🎨 Design Elements

### Color Theme

- **Accent**: Cyan (#00d9ff)
- **Accent Purple**: Vibrant purple
- **Background**: Dark (#0f172a)
- **Glass Effect**: Transparent white overlays

### Navigation

- **Sidebar**: Left-side with collapsible menu
- **Top Bar**: Shows active project context and notifications
- **Active States**: Highlighted menu items and breadcrumb trails

## 💡 Key Interactions

### Status Management

- Click any status icon to rotate through statuses
- Instant UI update on status change
- Visual indicators for each status

### Modal Forms

- Fill in the form fields
- Click "Submit" or "Cancel"
- Successful submissions add to list immediately

### Notifications

- Click bell icon in top bar
- See list of notifications
- Click to mark as read (blue dot disappears)

### Profile Updates

- Edit any field in Settings
- Click "Save Profile"
- Green success message appears
- Profile data updates across app

## 🔄 State Management

### Context Hook

```javascript
import { StudentDataContext } from "../context/StudentContext";
const { activeProject, tasks, updateTaskStatus } =
  useContext(StudentDataContext);
```

### Available Data

- `student` - Current student profile
- `projects` - All projects
- `activeProject` - Currently selected project
- `tasks` / `activeTasks` - Task lists
- `meetings` / `activeMeetings` - Meeting lists
- `reports` - All reports
- `vivaData` - Viva preparation data
- `notifications` - Notification list
- `settings` - User preferences

### Available Actions

- `updateTaskStatus(taskId, status)`
- `addTask(taskData)`
- `deleteTask(taskId)`
- `switchActiveProject(projectId)`
- `submitReport(reportData)`
- `addMeetingNotes(meetingId, notes)`
- `updateStudentProfile(updates)`
- `updateSettings(updates)`

## 🚀 Performance Features

- ✅ Smooth animations using Framer Motion
- ✅ Optimized re-renders with Context
- ✅ Lazy-loaded components
- ✅ Responsive design for all screens
- ✅ Hot reload enabled during development

## 📱 Responsive Behavior

- **Mobile**: Sidebar collapses, single column layouts
- **Tablet**: 2-column grids, full sidebar
- **Desktop**: 3-4 column grids, full navigation

## 🔍 Debugging Tips

1. **Check Console**: Open browser DevTools (F12) to see any errors
2. **Test Navigation**: Click sidebar items to test routing
3. **Check State**: All state changes are logged in context
4. **Verify Mock Data**: Check StudentContext.jsx for current mock data
5. **Test Forms**: Try adding tasks or reports to test modal forms

## ✅ Testing Checklist

- [ ] All 8 routes navigate correctly
- [ ] Sidebar highlights active page
- [ ] Can add/delete/update tasks
- [ ] Projects can be switched
- [ ] Meeting notes can be saved
- [ ] Reports can be submitted
- [ ] Profile settings can be updated
- [ ] Notifications appear and can be read
- [ ] Viva mode tabs work correctly
- [ ] Mobile responsive works on small screens

---

**Development Server**: `http://localhost:5173/`

**Hot Reload**: Enabled - Changes save automatically

**Ready to use with backend**: All functions prepared for API integration

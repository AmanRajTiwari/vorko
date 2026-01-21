# Vorko Authentication System - Implementation Guide

## 🎯 Overview

A complete role-based authentication (RBAC) system for Vorko SaaS platform with:

- **Students** and **Mentors** login
- Protected routes per role
- Persistent session (localStorage)
- Clean UI with role badges
- Mock authentication (backend-ready)

---

## 📁 Architecture

### File Structure

```
src/
├── contexts/
│   └── AuthContext.jsx         # Auth state management & logic
├── components/
│   ├── auth/
│   │   ├── LoginPage.jsx        # Login form with role selector
│   │   ├── SignupPage.jsx       # Signup form
│   │   └── ProtectedRoute.jsx   # Route protection wrapper
│   ├── Navbar.jsx               # Updated with auth buttons
│   ├── dashboard/               # Student components
│   └── mentor-dashboard/        # Mentor components
└── App.jsx                      # Routes with protection
```

---

## 🔐 Authentication Flow

### 1. User Logs In

```
User visits /login
     ↓
Selects role (Student/Mentor)
     ↓
Enters credentials (email + password)
     ↓
AuthContext validates credentials
     ↓
On success: Save user + role to localStorage
     ↓
Redirect to /student/dashboard OR /mentor/dashboard
```

### 2. Route Protection

```
User tries to access /student/dashboard
     ↓
ProtectedRoute checks auth status
     ↓
Is authenticated? NO → Redirect to /login
Is authenticated? YES → Check role
     ↓
Role matches (student)? YES → Show page
Role matches (student)? NO → Redirect to /mentor/dashboard
```

### 3. Session Persistence

```
User logs in → Credentials saved to localStorage
     ↓
User refreshes page
     ↓
App.jsx loads → AuthContext checks localStorage
     ↓
Valid session found → Restore user state (no re-login needed)
     ↓
User continues with dashboard
```

---

## 🔑 AuthContext API

### State

```javascript
{
  user: {
    id: string,
    email: string,
    name: string,
    rollNumber?: string,      // Students only
    department?: string        // Mentors only
  },
  role: "student" | "mentor",
  isAuthenticated: boolean,
  isLoading: boolean
}
```

### Methods

```javascript
// Login user
login(email: string, password: string, role: string)
  Returns: Promise<newAuth>
  Side effects: Sets state + localStorage

// Create new account
signup(name: string, email: string, password: string, role: string)
  Returns: Promise<newAuth>
  Side effects: Sets state + localStorage

// Logout user
logout()
  Returns: void
  Side effects: Clears state + localStorage

// Check user role
hasRole(requiredRole: string)
  Returns: boolean
```

### Usage

```javascript
import { useAuth } from "../contexts/AuthContext";

function MyComponent() {
  const { user, role, isAuthenticated, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await login("student@vorko.com", "password", "student");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

---

## 🛡️ ProtectedRoute Component

### Purpose

Guards routes by checking:

1. User is authenticated
2. User has correct role

### Usage

```jsx
<ProtectedRoute allowedRole="student">
  <StudentDashboard />
</ProtectedRoute>
```

### Behavior

| Condition                    | Redirect                                    |
| ---------------------------- | ------------------------------------------- |
| Not authenticated            | `/login`                                    |
| Wrong role                   | `/student/dashboard` or `/mentor/dashboard` |
| Authenticated + correct role | Show component                              |

### Loading State

Shows spinner while restoring session from localStorage:

```jsx
<div className="w-full h-screen flex items-center justify-center bg-dark">
  <div className="flex flex-col items-center gap-4">
    <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
    <p className="text-gray-400">Loading...</p>
  </div>
</div>
```

---

## 📝 Login Page

### Location: `/login`

### Features

- **Role Selector**: Student or Mentor toggle
- **Email & Password fields**: Standard form inputs
- **Demo Credentials**: One-click buttons to fill test credentials
- **Error Handling**: Shows error alerts
- **Loading State**: Disabled button during request
- **Links**: Sign up + back to home
- **Animations**: Smooth transitions with Framer Motion

### Demo Credentials

```
Student:
  Email: student@vorko.com
  Password: student123

Mentor:
  Email: mentor@vorko.com
  Password: mentor123
```

### Responsive

- Desktop: 400px card on left, gradient background
- Mobile: Full-width card, touch-optimized buttons

---

## 📝 Signup Page

### Location: `/signup`

### Features

- **Name field**: Full name input
- **Email & Password**: Standard auth fields
- **Confirm Password**: Password verification
- **Role Selector**: Student or Mentor
- **Validation**:
  - Name required
  - Valid email format
  - Password min 6 characters
  - Passwords match
- **Error Handling**: Shows validation errors
- **Links**: Login + back to home

### Process

1. User fills form
2. Frontend validates
3. AuthContext creates account
4. Auto-login to dashboard
5. Session persists

---

## 🧭 Updated Navbar

### Features

#### When Logged Out

- Login button
- Sign Up button
- Dashboard buttons redirect to `/login`

#### When Logged In

- **User Info**: Role badge (STUDENT/MENTOR) + name
- **Dashboard Button**: Takes to correct dashboard
- **Logout Button**: Clears auth + redirects to home

### Desktop Layout

```
[Logo] [Nav Items] [User Badge] [Dashboard] [Logout]
```

### Mobile Layout

```
[Logo] [Menu Button]
       ↓
       [Nav Items]
       [User Badge]
       [Dashboard]
       [Logout]
```

---

## 🔄 Route Protection

### Public Routes (No Protection)

```
/               → Landing page
/login          → Login form
/signup         → Signup form
/                → All landing page sections
```

### Protected Student Routes

```
/student/dashboard      ✅ Protected (student only)
/student/projects       ✅ Protected (student only)
/student/tasks          ✅ Protected (student only)
/student/team           ✅ Protected (student only)
/student/meetings       ✅ Protected (student only)
/student/reports        ✅ Protected (student only)
/student/viva-mode      ✅ Protected (student only)
/student/settings       ✅ Protected (student only)
```

### Protected Mentor Routes

```
/mentor/dashboard       ✅ Protected (mentor only)
/mentor/projects        ✅ Protected (mentor only)
/mentor/reviews         ✅ Protected (mentor only)
/mentor/meetings        ✅ Protected (mentor only)
/mentor/reports         ✅ Protected (mentor only)
/mentor/viva-readiness  ✅ Protected (mentor only)
/mentor/settings        ✅ Protected (mentor only)
```

---

## 💾 LocalStorage Structure

### Key: `vorko_auth`

```json
{
  "user": {
    "id": "STU001",
    "email": "student@vorko.com",
    "name": "Alex Johnson",
    "rollNumber": "20CS123"
  },
  "role": "student",
  "isAuthenticated": true,
  "isLoading": false
}
```

### Persistence Behavior

| Event              | Behavior                   |
| ------------------ | -------------------------- |
| User logs in       | Saved immediately          |
| User logs out      | Deleted immediately        |
| Page refresh       | Restored from localStorage |
| Browser close      | Persists until logout      |
| Clear localStorage | User must re-login         |

---

## 🔐 Mock Authentication

### Current Implementation (Development)

```javascript
// Mock users database
const MOCK_USERS = {
  student: {
    email: "student@vorko.com",
    password: "student123",
    role: "student",
    id: "STU001",
    name: "Alex Johnson",
    rollNumber: "20CS123",
  },
  mentor: {
    email: "mentor@vorko.com",
    password: "mentor123",
    role: "mentor",
    id: "MEN001",
    name: "Dr. James Mitchell",
    department: "AI & Machine Learning",
  },
};
```

### Simulated Delay

- Login request: 800ms delay (simulates API call)
- Signup request: 800ms delay
- Helps test loading states

### Backend Integration

To connect to real backend:

1. **Replace mock validation** in `AuthContext.jsx`:

```javascript
// OLD (mock)
const mockUser = MOCK_USERS[userType];
if (email === mockUser.email && password === mockUser.password) { ... }

// NEW (API call)
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, role })
});
const data = await response.json();
// Handle response
```

2. **Update token handling**:

```javascript
// Save JWT token instead of plain auth state
localStorage.setItem("vorko_token", data.token);
```

3. **Add API interceptor** for requests

---

## 🎨 UI Components

### Login Form

- Email input (validated)
- Password input (masked)
- Role selector buttons
- Submit button (disabled while loading)
- Error/success alerts
- Demo credential buttons
- Links (Signup, Home)

### Error Alert

```jsx
<div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
  <AlertCircle className="text-red-400" />
  <p className="text-red-400">{error}</p>
</div>
```

### Success Alert

```jsx
<div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
  <Check className="text-green-400" />
  <p className="text-green-400">{success}</p>
</div>
```

### User Badge (Navbar)

```jsx
<div className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30">
  <div className="text-xs font-semibold text-accent capitalize">{role}</div>
  <div className="text-xs text-gray-400">{user.name}</div>
</div>
```

---

## 🚀 Testing Flow

### Test Student Login

1. Go to http://localhost:5173/login
2. Select "Student" role
3. Click "📚 Student: student@vorko.com / student123"
4. Click "Sign In"
5. Should redirect to `/student/dashboard`
6. Navbar shows "STUDENT | Alex Johnson"
7. Refresh page → Should persist session
8. Click "Logout" → Redirects to home, session cleared

### Test Mentor Login

1. Go to http://localhost:5173/login
2. Select "Mentor" role
3. Click "👨‍🏫 Mentor: mentor@vorko.com / mentor123"
4. Click "Sign In"
5. Should redirect to `/mentor/dashboard`
6. Navbar shows "MENTOR | Dr. James Mitchell"
7. Refresh page → Should persist session
8. Click "Logout" → Redirects to home, session cleared

### Test Access Control

1. Login as **Student**
2. Try to access `/mentor/dashboard` manually
3. Should redirect to `/student/dashboard`
4. Login as **Mentor**
5. Try to access `/student/dashboard` manually
6. Should redirect to `/mentor/dashboard`

### Test Protected Routes

1. Logout
2. Try to access `/student/dashboard` manually
3. Should redirect to `/login`
4. Same for `/mentor/*` routes

### Test Signup

1. Go to http://localhost:5173/signup
2. Fill form:
   - Name: "Test User"
   - Email: "test@vorko.com"
   - Password: "password123"
   - Confirm: "password123"
3. Select role: "Student"
4. Click "Sign Up"
5. Should auto-login and redirect to dashboard

---

## 📊 Session Management

### Active Session Display

```
Navbar shows:
  ├─ Role: STUDENT or MENTOR (cyan badge)
  ├─ Name: User's full name
  └─ Dashboard & Logout buttons
```

### Session Timeout (Future)

Currently no timeout. To add:

```javascript
// Set timeout on login
const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
localStorage.setItem("vorko_auth_expiry", expiryTime);

// Check on app load
const expiry = localStorage.getItem("vorko_auth_expiry");
if (expiry && Date.now() > expiry) {
  logout(); // Auto logout if expired
}
```

---

## 🔒 Security Notes

### Frontend Level ✅

- Role validation on routes
- No sensitive data in localStorage (only user info + role)
- Logout clears all sensitive data
- Protected route components check authentication

### Backend Level ⚠️ (Not implemented yet)

- Token-based auth (JWT)
- HTTPS only
- Secure cookies (HttpOnly flag)
- CORS validation
- Rate limiting
- Password hashing (bcrypt)
- Refresh tokens

---

## 🐛 Common Issues

### Issue: User stays logged in after refresh

**Solution**: Expected behavior! localStorage persists session.

To clear: Click Logout button or manually clear localStorage:

```javascript
localStorage.removeItem("vorko_auth");
```

### Issue: Cannot access dashboard without login

**Solution**: Expected! Routes are protected. Login first with:

- Email: `student@vorko.com` or `mentor@vorko.com`
- Password: `student123` or `mentor123`

### Issue: Redirects to wrong dashboard

**Solution**: ProtectedRoute checks role and redirects to correct dashboard.

---

## 🎯 Next Steps

### Immediate

1. ✅ Test all login flows
2. ✅ Verify role isolation (student can't see mentor routes)
3. ✅ Check session persistence
4. ✅ Test on mobile responsive

### Short Term

1. Add "Remember Me" checkbox
2. Add password reset flow
3. Add email verification
4. Add 2FA (optional)

### Long Term

1. Connect to backend API
2. Implement JWT tokens
3. Add refresh token rotation
4. Add session timeout
5. Add audit logging
6. Add account recovery

---

## 📚 Component Reference

### AuthContext.jsx

**Exports**:

- `AuthProvider` - Component wrapper
- `useAuth()` - Hook to access auth state
- `AuthContext` - Context object

**Mock Data**:

- 1 student account
- 1 mentor account

### ProtectedRoute.jsx

**Props**:

- `children` - Component to render
- `allowedRole` - Required role ("student" | "mentor")

**Returns**: Component or redirect

### LoginPage.jsx

**Route**: `/login`
**Features**: Form, demo buttons, error/success alerts

### SignupPage.jsx

**Route**: `/signup`
**Features**: Form, validation, auto-login

### Navbar.jsx (Updated)

**Changes**:

- Added useAuth hook
- Added login/logout buttons
- Show user badge when authenticated
- Role-aware dashboard redirect

---

## 💡 Pro Tips

1. **Demo Mode**: Click demo credential buttons to fill form instantly
2. **Different Role**: Switch role selector before entering credentials
3. **Session Check**: Open DevTools → Application → LocalStorage → vorko_auth
4. **Test Isolation**: Use incognito window to test logout (separate session)
5. **Mobile Test**: Use DevTools device emulation or test on phone

---

## ✅ Checklist

- [x] AuthContext implemented
- [x] ProtectedRoute component created
- [x] LoginPage with demo credentials
- [x] SignupPage with validation
- [x] Routes protected (student/mentor)
- [x] Navbar updated with auth UI
- [x] localStorage persistence
- [x] Session restore on refresh
- [x] Role-based redirects
- [x] Error handling
- [x] Loading states
- [x] Responsive design

---

## 📞 Support

For issues or questions:

1. Check browser console for errors
2. Verify localStorage has `vorko_auth` key
3. Check Network tab for API calls
4. Test with demo credentials first
5. Try incognito mode (clears cache)

---

**Status**: ✅ Ready for Testing | 🚀 Production Ready (with backend integration)

**Last Updated**: January 3, 2026

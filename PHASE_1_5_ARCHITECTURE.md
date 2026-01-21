# Phase 1.5 Architecture & Flow Diagram

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React App (Vite)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            AuthProvider (Context)                    │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │ State:                                         │  │   │
│  │  │ - user (Supabase auth user)                   │  │   │
│  │  │ - profile (from DB)                           │  │   │
│  │  │ - role (student | mentor)                     │  │   │
│  │  │ - isAuthenticated                             │  │   │
│  │  │ - isLoading                                   │  │   │
│  │  │ - error                                       │  │   │
│  │  │                                                │  │   │
│  │  │ Methods:                                       │  │   │
│  │  │ - login()                                      │  │   │
│  │  │ - signup()                                     │  │   │
│  │  │ - logout()                                     │  │   │
│  │  │ - hasRole()                                    │  │   │
│  │  │ - getDashboardUrl()                            │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │            ↓              ↓              ↓            │   │
│  │       useAuth()       useAuth()      useAuth()        │   │
│  │            ↓              ↓              ↓            │   │
│  │      ┌──────────┐  ┌──────────┐  ┌──────────┐       │   │
│  │      │LoginPage │  │SignupPage│  │Dashboard │       │   │
│  │      └──────────┘  └──────────┘  └──────────┘       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         ProtectedRoute Component                     │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │ Checks:                                        │  │   │
│  │  │ - isAuthenticated?                             │  │   │
│  │  │ - hasAllowedRole?                              │  │   │
│  │  │ - isLoading?                                   │  │   │
│  │  │                                                │  │   │
│  │  │ Actions:                                       │  │   │
│  │  │ ✓ Render children                              │  │   │
│  │  │ ✗ Redirect to /login                           │  │   │
│  │  │ ✗ Redirect to correct dashboard               │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   Auth Utilities                            │
│              (src/lib/auth.js)                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ signUpWith   │  │ signInWith    │  │ getCurrent   │      │
│  │ Email        │  │ Email         │  │ Profile      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ signOut      │  │ getSession    │  │ onAuth       │      │
│  │              │  │               │  │ StateChange  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  Supabase Client                            │
│              (src/lib/supabase.js)                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│          supabase.auth.*          supabase.from('profiles')  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                 Supabase Cloud                              │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐        ┌──────────────────────┐      │
│  │ auth.users       │        │ profiles table       │      │
│  │                  │        │                      │      │
│  │ - id (UUID)      │ ◄──────► - id (FK to auth)   │      │
│  │ - email          │        │ - email              │      │
│  │ - password hash  │        │ - name               │      │
│  │ - session token  │        │ - role               │      │
│  │ - created_at     │        │ - created_at         │      │
│  └──────────────────┘        └──────────────────────┘      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Sign Up Flow

```
START
  │
  ├─► User visits /signup
  │
  ├─► Fills form: name, email, password, role
  │
  ├─► Clicks "Sign Up"
  │
  ├─► SignupPage validates input
  │      ✓ Name not empty?
  │      ✓ Valid email format?
  │      ✓ Password >= 6 chars?
  │      ✓ Passwords match?
  │
  ├─► AuthContext.signup() called
  │      │
  │      ├─► signUpWithEmail(name, email, password, role)
  │      │    │
  │      │    ├─► supabase.auth.signUp()
  │      │    │    └─► Creates account in auth.users
  │      │    │
  │      │    ├─► supabase.from('profiles').insert()
  │      │    │    └─► Stores profile with role
  │      │    │
  │      │    └─► Returns { user, profile }
  │      │
  │      └─► Updates AuthContext state
  │           ├─ user
  │           ├─ profile
  │           ├─ role
  │           └─ isAuthenticated = true
  │
  ├─► onAuthStateChange listener fires
  │      └─► Confirms user is logged in
  │
  ├─► SignupPage checks role
  │      ├─ If 'mentor' → navigate to /mentor/dashboard
  │      └─ If 'student' → navigate to /student/dashboard
  │
  ├─► ProtectedRoute validates
  │      ├─ isAuthenticated? ✓
  │      ├─ allowedRole matches? ✓
  │      └─► Renders Dashboard
  │
  └─► END (User logged in on dashboard)
```

---

## 🔑 Login Flow

```
START
  │
  ├─► User visits /login
  │
  ├─► Enters email & password
  │
  ├─► Clicks "Sign In"
  │
  ├─► LoginPage validates
  │      ✓ Email and password filled?
  │
  ├─► AuthContext.login() called
  │      │
  │      ├─► signInWithEmail(email, password)
  │      │    │
  │      │    ├─► supabase.auth.signInWithPassword()
  │      │    │    └─► Validates credentials
  │      │    │        ✓ User exists?
  │      │    │        ✓ Password correct?
  │      │    │        └─► Returns session
  │      │    │
  │      │    ├─► getCurrentProfile(session.user.id)
  │      │    │    └─► Fetches from profiles table
  │      │    │
  │      │    └─► Returns { user, profile }
  │      │
  │      └─► Updates AuthContext state
  │           ├─ user = session.user
  │           ├─ profile = profile data
  │           ├─ role = profile.role
  │           └─ isAuthenticated = true
  │
  ├─► onAuthStateChange listener fires
  │      └─► Confirms session active
  │
  ├─► LoginPage redirects to dashboard
  │      ├─ If role === 'mentor' → /mentor/dashboard
  │      └─ If role === 'student' → /student/dashboard
  │
  ├─► ProtectedRoute validates
  │      ├─ isAuthenticated? ✓
  │      ├─ role matches allowedRole? ✓
  │      └─► Renders Dashboard
  │
  └─► END (User logged in)
```

---

## 🔄 Session Restore Flow (Page Refresh)

```
START
  │
  ├─► User refreshes page (F5)
  │      └─► App component remounts
  │
  ├─► AuthProvider component initializes
  │      │
  │      ├─► useEffect runs
  │      │    │
  │      │    ├─► getSession()
  │      │    │    └─► Checks if session exists in Supabase
  │      │    │        └─► Returns session or null
  │      │    │
  │      │    └─► If session exists:
  │      │         │
  │      │         ├─► getCurrentProfile(session.user.id)
  │      │         │    └─► Fetches profile from DB
  │      │         │
  │      │         └─► Updates state
  │      │              ├─ user = session.user
  │      │              ├─ profile = profile data
  │      │              ├─ role = profile.role
  │      │              ├─ isAuthenticated = true
  │      │              └─ isLoading = false
  │      │
  │      └─► onAuthStateChange listener activated
  │           └─► Monitors for future auth changes
  │
  ├─► ProtectedRoute checks auth state
  │      ├─ isLoading? Show spinner
  │      ├─ isAuthenticated? ✓
  │      ├─ Role matches? ✓
  │      └─► Renders Dashboard
  │
  └─► END (Session restored, user stays logged in)
```

---

## 🚫 Access Control Flow

```
SCENARIO: Student tries to access /mentor/dashboard

START
  │
  ├─► User (student) clicks /mentor/dashboard
  │
  ├─► ProtectedRoute component loads
  │      │
  │      ├─► Check isLoading?
  │      │    └─► No, continue
  │      │
  │      ├─► Check isAuthenticated?
  │      │    └─► Yes (student is logged in)
  │      │
  │      ├─► Check allowedRole matches?
  │      │    └─► allowedRole = 'mentor'
  │      │    └─► auth.role = 'student'
  │      │    └─► NO MATCH! ✗
  │      │
  │      ├─► Get redirect path
  │      │    ├─ role === 'mentor'? No
  │      │    └─► Default to /student/dashboard
  │      │
  │      └─► Navigate to /student/dashboard
  │
  ├─► ProtectedRoute validates again
  │      ├─ isAuthenticated? ✓
  │      ├─ allowedRole === 'student'? ✓
  │      └─► Renders StudentDashboard
  │
  └─► END (User redirected to correct dashboard)
```

---

## 🚪 Logout Flow

```
START
  │
  ├─► User clicks "Logout" button
  │
  ├─► handleLogout() called
  │      │
  │      ├─► AuthContext.logout()
  │      │    │
  │      │    ├─► Set isLoading = true
  │      │    │
  │      │    ├─► signOut()
  │      │    │    └─► supabase.auth.signOut()
  │      │    │        └─► Clears session from browser
  │      │    │        └─► Clears session from Supabase
  │      │    │
  │      │    └─► Reset state to initial
  │      │         ├─ user = null
  │      │         ├─ profile = null
  │      │         ├─ role = null
  │      │         ├─ isAuthenticated = false
  │      │         └─ isLoading = false
  │      │
  │      └─► onAuthStateChange listener fires
  │           └─► Event: SIGNED_OUT
  │
  ├─► Navigate to /login
  │
  ├─► Try to access /student/dashboard
  │      │
  │      ├─► ProtectedRoute checks
  │      │    ├─ isAuthenticated? ✗ (false)
  │      │    └─► Redirect to /login
  │      │
  │      └─► User stays on /login
  │
  └─► END (User logged out, session cleared)
```

---

## 📊 State Management Flow

```
┌──────────────────────────────────────────────────────┐
│           AuthContext State Tree                     │
├──────────────────────────────────────────────────────┤
│                                                       │
│  auth: {                                              │
│    user: {                      (from supabase)       │
│      id,                         (UUID)                │
│      email,                                            │
│      app_metadata,                                    │
│      ...                                              │
│    },                                                 │
│                                                       │
│    profile: {                   (from profiles DB)    │
│      id,                                              │
│      email,                                           │
│      name,                                            │
│      role: 'student'|'mentor',                        │
│      created_at                                       │
│    },                                                 │
│                                                       │
│    role: 'student'|'mentor'|null,                     │
│    isAuthenticated: boolean,                          │
│    isLoading: boolean,                                │
│    error: string|null                                 │
│  }                                                    │
│                                                       │
│  methods: {                                           │
│    login,                       (email, password)     │
│    signup,                      (name, email, pwd, role)
│    logout,                      ()                    │
│    hasRole,                     (requiredRole)        │
│    getDashboardUrl              ()                    │
│  }                                                    │
│                                                       │
└──────────────────────────────────────────────────────┘
```

---

## 🔐 Security Boundaries

```
┌─────────────────────────────────────────────────────┐
│                  Public Access                      │
│                                                     │
│  /               (Landing page)                     │
│  /login          (LoginPage)                        │
│  /signup         (SignupPage)                       │
│                                                     │
└─────────────────────────────────────────────────────┘
              ↓ (Must be authenticated)
┌─────────────────────────────────────────────────────┐
│              Protected Routes                       │
├──────────────────────────────────────────────────┬──┤
│ Student Only          │    Mentor Only          │  │
│                       │                         │  │
│ /student/dashboard    │ /mentor/dashboard      │  │
│ /student/projects     │ /mentor/students       │  │
│ /student/grades       │ /mentor/reviews        │  │
│                       │                         │  │
│ (role check: 'student'│ (role check: 'mentor') │  │
│  Cross-access denied) │  Cross-access denied)  │  │
│                       │                         │  │
└───────────────────────┴─────────────────────────┴──┘
```

---

## 📱 Component Dependency Graph

```
App.jsx
  │
  ├─► AuthProvider (wraps entire app)
  │    │
  │    ├─► useEffect (initialize auth on mount)
  │    │    ├─► getSession()
  │    │    ├─► getCurrentProfile()
  │    │    └─► onAuthStateChange() listener
  │    │
  │    └─► AuthContext.Provider
  │         │
  │         ├─► Router
  │         │    │
  │         │    ├─► Route("/login") → LoginPage
  │         │    │    └─► useAuth()
  │         │    │         └─► login(email, password)
  │         │    │
  │         │    ├─► Route("/signup") → SignupPage
  │         │    │    └─► useAuth()
  │         │    │         └─► signup(name, email, password, role)
  │         │    │
  │         │    ├─► Route("/student/*") → ProtectedRoute
  │         │    │    └─► StudentDashboard
  │         │    │         └─► useAuth()
  │         │    │
  │         │    └─► Route("/mentor/*") → ProtectedRoute
  │         │         └─► MentorDashboard
  │         │              └─► useAuth()
  │         │
  │         └─► Any component can use useAuth()
  │              to access auth state
```

---

## ✅ Implementation Complete

All flows visualized and implemented in Phase 1.5!

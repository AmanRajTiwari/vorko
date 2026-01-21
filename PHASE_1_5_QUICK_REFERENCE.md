# Phase 1.5 Quick Reference Guide

## 🚀 Quick Start for Developers

### Step 1: Add Supabase Credentials

Update `.env`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 2: Create Profiles Table in Supabase

Run in Supabase SQL Editor:

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'mentor')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
```

### Step 3: Test Auth Flow

```bash
npm run dev
# Navigate to http://localhost:5173
# Click "Sign up" to create account
# Try logging in
```

---

## 📚 API Reference

### AuthContext Hook

```jsx
import { useAuth } from "@/contexts/AuthContext";

const {
  // State
  user, // Supabase auth user object
  profile, // User profile from DB
  role, // 'student' or 'mentor'
  isAuthenticated, // Boolean
  isLoading, // Loading during auth check
  error, // Error message if any

  // Methods
  login, // async (email, password)
  signup, // async (name, email, password, role)
  logout, // async ()
  hasRole, // (requiredRole) -> boolean
  getDashboardUrl, // () -> string
} = useAuth();
```

### Auth Utilities

```jsx
import {
  signUpWithEmail,
  signInWithEmail,
  getCurrentProfile,
  signOut,
  getSession,
  onAuthStateChange,
} from "@/lib/auth";

// Sign up
const result = await signUpWithEmail(
  "John Doe",
  "john@example.com",
  "password123",
  "student"
);

// Sign in
const result = await signInWithEmail("john@example.com", "password123");

// Get profile
const profile = await getCurrentProfile(userId);

// Sign out
await signOut();

// Get session
const session = await getSession();

// Subscribe to auth changes
const sub = onAuthStateChange((event, session) => {
  console.log(event); // 'SIGNED_IN', 'SIGNED_OUT'
});
```

---

## 🔐 Protecting Routes

### In App.jsx or Router

```jsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignupPage />} />

  {/* Student routes */}
  <Route
    path="/student/dashboard"
    element={
      <ProtectedRoute allowedRole="student">
        <StudentDashboard />
      </ProtectedRoute>
    }
  />

  {/* Mentor routes */}
  <Route
    path="/mentor/dashboard"
    element={
      <ProtectedRoute allowedRole="mentor">
        <MentorDashboard />
      </ProtectedRoute>
    }
  />
</Routes>;
```

---

## 💾 Using Supabase Client

### Basic Query Example

```jsx
import { supabase } from "@/lib/supabase";

// Read
const { data, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("role", "mentor");

// Insert
const { data, error } = await supabase
  .from("profiles")
  .insert([{ id, email, name, role }]);

// Update
const { data, error } = await supabase
  .from("profiles")
  .update({ name: "New Name" })
  .eq("id", userId);

// Delete
const { error } = await supabase.from("profiles").delete().eq("id", userId);
```

---

## 🎯 Common Patterns

### Check if User is Logged In

```jsx
function MyComponent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  return isAuthenticated ? <Dashboard /> : <Navigate to="/login" />;
}
```

### Redirect Based on Role

```jsx
const { role, getDashboardUrl } = useAuth();

const handleLoginSuccess = () => {
  const url = getDashboardUrl();
  navigate(url);
};
```

### Display User Info

```jsx
const { profile } = useAuth();

<h1>Welcome {profile?.name}</h1>
<p>Role: {profile?.role}</p>
```

### Logout Handler

```jsx
const { logout } = useAuth();

const handleLogout = async () => {
  try {
    await logout();
    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
```

---

## ⚠️ Error Handling

### Try-Catch Pattern

```jsx
try {
  const result = await login(email, password);
  console.log("Login successful:", result);
} catch (error) {
  // error.message contains user-friendly message
  setError(error.message);
}
```

### Common Errors

| Error                       | Cause                       | Fix                    |
| --------------------------- | --------------------------- | ---------------------- |
| "Invalid login credentials" | Wrong email/password        | Check credentials      |
| "User already registered"   | Email taken                 | Use different email    |
| "Missing env vars"          | Env variables not set       | Update `.env`          |
| "Profile not found"         | User created but no profile | Check `profiles` table |

---

## 🧪 Testing Guide

### Test Sign Up

```
1. Click "Sign up"
2. Select role
3. Enter email, password, confirm password
4. Click "Sign Up"
5. Should redirect to dashboard
```

### Test Login

```
1. Click "Sign in"
2. Enter credentials
3. Click "Sign In"
4. Should redirect to dashboard
```

### Test Session Persistence

```
1. Login
2. Press F5 to refresh
3. Should still be logged in
4. Session should be restored
```

### Test Role-Based Access

```
Student:
  1. Login as student
  2. Visit /mentor/dashboard
  3. Should redirect to /student/dashboard

Mentor:
  1. Login as mentor
  2. Visit /student/dashboard
  3. Should redirect to /mentor/dashboard
```

### Test Logout

```
1. Login
2. Click logout
3. Should redirect to /login
4. Refresh page - should stay on /login
```

---

## 📁 File Locations

| File                                     | Purpose                        |
| ---------------------------------------- | ------------------------------ |
| `src/lib/supabase.js`                    | Supabase client initialization |
| `src/lib/auth.js`                        | Auth utility functions         |
| `src/contexts/AuthContext.jsx`           | Global auth state management   |
| `src/components/auth/LoginPage.jsx`      | Login form                     |
| `src/components/auth/SignupPage.jsx`     | Signup form                    |
| `src/components/auth/ProtectedRoute.jsx` | Route protection               |
| `.env`                                   | Environment variables          |
| `.env.example`                           | Env template                   |

---

## 🔗 Useful Links

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [React Router Protected Routes](https://reactrouter.com/en/main)
- [Context API](https://react.dev/reference/react/useContext)

---

## ✅ Implementation Status

- [x] Supabase client configured
- [x] Auth context with full integration
- [x] Login functionality
- [x] Signup functionality
- [x] Session restoration
- [x] Role-based route protection
- [x] Error handling
- [x] Loading states

**Ready to proceed to Phase 2!**

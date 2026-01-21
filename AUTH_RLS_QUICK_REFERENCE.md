# Auth Flow Refactoring - Quick Reference Guide

## What Changed? (TL;DR)

**Before**: Signup created both auth + profile ❌ (RLS violation)  
**After**: Signup creates auth, login updates profile ✅ (RLS compliant)

## The New Flow

```
┌─────────────┐
│   Signup    │  Collects: name, email, password, role
└──────┬──────┘
       │
       ├─→ signUpWithEmail(email, password) [auth only]
       │   └─→ Database trigger creates profile automatically
       │
       ├─→ Store pending data to sessionStorage
       │   ├─ pendingName
       │   ├─ pendingRole
       │   └─ pendingEmail
       │
       └─→ Redirect to /login
           └─→ Show "Account created! Please log in."

┌─────────────┐
│   Login     │  Pre-fills email from sessionStorage
└──────┬──────┘
       │
       ├─→ login(email, password, pendingName, pendingRole)
       │   ├─→ signInWithEmail(email, password)
       │   ├─→ updateUserProfile(userId, name, role) ← NEW!
       │   └─→ Set auth state
       │
       ├─→ Clear sessionStorage
       │
       └─→ Redirect to /dashboard (based on role)
```

## Files Changed

### 1. `src/lib/auth.js`

```javascript
// REMOVED: Profile INSERT during signup
// ADDED: updateUserProfile() for post-login updates

signUpWithEmail(email, password); // Auth only ✅
updateUserProfile(userId, name, role); // NEW! ✅
signInWithEmail(email, password); // Fetch profile ✅
```

### 2. `src/contexts/AuthContext.jsx`

```javascript
// UPDATED: signup() - no auto-login
signup(name, email, password, role); // Returns user, not profile ✅

// UPDATED: login() - calls updateUserProfile
login(email, password, name, role); // Updates profile ✅
```

### 3. `src/components/auth/SignupPage.jsx`

```javascript
// CHANGED: Redirect from /dashboard → /login
// ADDED: Store pending data to sessionStorage
// ADDED: Pass email in navigation state
```

### 4. `src/components/auth/LoginPage.jsx`

```javascript
// ADDED: Load pending data from sessionStorage
// ADDED: Pre-fill email from signup
// UPDATED: Pass name & role to login method
// ADDED: Clear sessionStorage after login
```

## Key Differences

| Phase              | Before                              | After                           |
| ------------------ | ----------------------------------- | ------------------------------- |
| **Signup**         | Creates auth + profile              | Creates auth only               |
| **Trigger**        | Duplicate (frontend already did it) | Creates profile (first time)    |
| **Before Login**   | User already logged in              | User needs to login             |
| **Login**          | Just authenticates                  | Authenticates + updates profile |
| **RLS Violations** | ❌ Yes (INSERT during signup)       | ✅ No (only UPDATE after login) |

## How It Works: Step-by-Step

### For New Users (Sign Up → Login)

**Step 1: User Signup**

```javascript
// SignupPage collects
name: "Alice";
email: "alice@example.com";
password: "Test123!";
role: "student";

// Calls signup from AuthContext
await signup(name, email, password, role);
```

**Step 2: Auth Creation**

```javascript
// AuthContext calls auth.js
await signUpWithEmail(email, password);
// Supabase creates user in auth.users
// Database trigger auto-creates record in profiles table
```

**Step 3: Pending Data Storage**

```javascript
// SignupPage stores for next step
sessionStorage.setItem("pendingName", "Alice");
sessionStorage.setItem("pendingRole", "student");
sessionStorage.setItem("pendingEmail", "alice@example.com");
```

**Step 4: Redirect to Login**

```javascript
navigate("/login", {
  state: { email: "alice@example.com", message: "..." },
});
```

**Step 5: User Logs In**

```javascript
// LoginPage pre-fills email, user enters password
email: "alice@example.com";
password: "Test123!";

// Calls login from AuthContext
await login(email, password, pendingName, pendingRole);
```

**Step 6: Profile Update**

```javascript
// AuthContext now calls updateUserProfile
await updateUserProfile(userId, "Alice", "student");
// Updates the profile that trigger created
// NOW user has name and role set
```

**Step 7: Auth State Set & Redirect**

```javascript
// User logged in with complete profile
// Redirects to /student/dashboard
```

### For Returning Users (Just Login)

**Step 1: User Logs In**

```javascript
// No pending data in sessionStorage
email: "alice@example.com";
password: "Test123!";

await login(email, password, null, null);
```

**Step 2: Profile Fetched**

```javascript
// signInWithEmail fetches existing profile
// Profile already has name="Alice", role="student"
```

**Step 3: No Update Needed**

```javascript
// Since name and role are null (not provided)
// Profile not updated, just fetched
```

**Step 4: Redirect to Dashboard**

```javascript
// Redirects to /mentor/dashboard or /student/dashboard
// based on role from profile
```

## Data Flow Diagram

```
┌──────────────────────────────────────────────────┐
│          SignupPage Component                    │
│  Collects: name, email, password, role          │
│  On Submit:                                      │
│    1. Call signup(name, email, pass, role)      │
│    2. Store to sessionStorage                   │
│    3. Redirect to /login                        │
└──────────────────────────────────────────────────┘
           │
           │ signup()
           ↓
┌──────────────────────────────────────────────────┐
│          AuthContext (signup method)             │
│  1. Call signUpWithEmail(email, password)       │
│  2. Return { user } (no profile)                │
│  3. Trigger redirects to LoginPage              │
└──────────────────────────────────────────────────┘
           │
           │ signUpWithEmail()
           ↓
┌──────────────────────────────────────────────────┐
│          auth.js (signUpWithEmail)              │
│  1. supabase.auth.signUp()                      │
│  2. Returns user (no profile insert)            │
│  3. Database trigger auto-creates profile      │
└──────────────────────────────────────────────────┘
           │
           │ (User goes to LoginPage)
           │ (Loads pending data from sessionStorage)
           ↓
┌──────────────────────────────────────────────────┐
│          LoginPage Component                     │
│  Pre-filled email from signup                   │
│  On Submit:                                      │
│    1. Call login(email, password, name, role)  │
│    2. Clear sessionStorage                      │
│    3. Redirect to /dashboard                    │
└──────────────────────────────────────────────────┘
           │
           │ login()
           ↓
┌──────────────────────────────────────────────────┐
│          AuthContext (login method)              │
│  1. Call signInWithEmail(email, password)       │
│  2. If name or role provided:                   │
│     - Call updateUserProfile(userId, name, role│
│  3. Set auth state                              │
│  4. Return { user, profile }                    │
└──────────────────────────────────────────────────┘
           │
           ├─→ signInWithEmail()
           │   └─→ auth.js: Authenticate + fetch profile
           │
           ├─→ updateUserProfile()
           │   └─→ auth.js: UPDATE profile table
           │
           └─→ Redirect to appropriate dashboard
```

## Session Storage Keys

Used for passing data from Signup → Login:

| Key            | Value            | Example               |
| -------------- | ---------------- | --------------------- |
| `pendingName`  | User's full name | "Alice Johnson"       |
| `pendingRole`  | Selected role    | "student" or "mentor" |
| `pendingEmail` | Email address    | "alice@example.com"   |

**Cleared after login succeeds.**

## RLS Policy Compliance

### ✅ Operations Now Allowed by RLS

```sql
-- Create auth (Supabase handles, not frontend)
INSERT INTO auth.users (...) VALUES (...)

-- Update own profile (allowed because user has session)
UPDATE profiles
SET name = 'Alice', role = 'student'
WHERE id = auth.uid()
```

### ❌ Operations Now BLOCKED by RLS

```sql
-- Create profile from frontend (what we were doing before)
INSERT INTO profiles (...)  VALUES (...)  ← RLS BLOCKS THIS!
```

## Testing Checklist

- [ ] Navigate to /signup
- [ ] Fill form with name, email, password, role
- [ ] Click "Sign Up"
  - [ ] See success message
  - [ ] Redirected to /login
  - [ ] Email pre-filled
- [ ] Enter password, click "Sign In"
  - [ ] Login succeeds
  - [ ] Redirected to correct dashboard
- [ ] Check Supabase database:
  - [ ] User exists in auth.users
  - [ ] Profile exists in profiles with name and role
- [ ] Logout, login again with same credentials
  - [ ] Should work (existing profile)

## Common Issues & Fixes

### Issue: "Profile not found" error

**Cause**: Database trigger didn't create profile  
**Fix**: Verify trigger exists and is enabled in Supabase

### Issue: Login succeeds but name/role are null

**Cause**: updateUserProfile not called  
**Fix**: Verify login method receives name and role parameters

### Issue: "RLS policy violation" error

**Cause**: Still trying to INSERT into profiles from frontend  
**Fix**: Check that signUpWithEmail doesn't insert into profiles

### Issue: SessionStorage data not loading on LoginPage

**Cause**: Missing useEffect or navigation state  
**Fix**: Verify useEffect loads from sessionStorage on component mount

## Production Checklist

- [ ] Test signup → login flow with real Supabase
- [ ] Verify database trigger is deployed
- [ ] Verify RLS policies are correct
- [ ] Test role-based redirects
- [ ] Test session persistence on refresh
- [ ] Monitor Supabase logs for errors
- [ ] Clean up demo accounts
- [ ] Deploy to production

---

**Quick Links**:

- Implementation: [AUTH_RLS_REFACTORING_COMPLETE.md](AUTH_RLS_REFACTORING_COMPLETE.md)
- Verification: [AUTH_RLS_FLOW_VERIFICATION.md](AUTH_RLS_FLOW_VERIFICATION.md)
- Code Files: `src/lib/auth.js`, `src/contexts/AuthContext.jsx`, `src/components/auth/`

**Status**: ✅ Ready for Testing
**Date**: January 18, 2025

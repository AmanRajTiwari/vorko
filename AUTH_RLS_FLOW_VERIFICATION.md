# Authentication RLS & Database Trigger Verification Guide

## Overview

This guide verifies that the Vorko authentication flow now correctly complies with Supabase RLS policies and database triggers.

## Architecture Changes

### Before (Incorrect - RLS Violations)

```
1. User fills signup form (name, email, password, role)
2. Frontend calls signup()
3. Frontend INSERTS into profiles table ❌ VIOLATES RLS
4. Auto-login user
5. Redirect to dashboard
```

### After (Correct - RLS Compliant)

```
1. User fills signup form (name, email, password, role)
2. Frontend calls signup() - AUTH ONLY
3. Database trigger auto-creates profile record ✅ No RLS violation
4. User redirected to login page
5. User logs in with email + password
6. Frontend calls updateUserProfile() to set name + role ✅ RLS compliant
7. Redirect to dashboard based on role
```

## File Changes Summary

### 1. `src/lib/auth.js` ✅ UPDATED

**Change**: Removed profile INSERT, added profile UPDATE function

```javascript
// OLD (REMOVED):
export const signUpWithEmail = async (email, password, name, role) => {
  // ... Creates auth
  // Then INSERTS into profiles ❌ RLS violation
};

// NEW:
export const signUpWithEmail = async (email, password) => {
  // Only creates auth, no profile INSERT
  // Database trigger will create profile automatically
};

// NEW:
export const updateUserProfile = async (userId, name, role) => {
  // UPDATEs profile with name and role
  // Called after login when user has active session
};
```

### 2. `src/contexts/AuthContext.jsx` ✅ UPDATED

**Change 1: Updated imports**

```javascript
// Added to imports from lib/auth
import { updateUserProfile } from "../lib/auth";
```

**Change 2: Updated signup method**

```javascript
// OLD: Auto-authenticated user after signup
// NEW: Returns user data without profile, no auto-login
const signup = useCallback(async (name, email, password, role) => {
  const result = await signUpWithEmail(email, password);
  // Returns user but NOT profile
  return { user: result.user };
}, []);
```

**Change 3: Updated login method**

```javascript
// NEW: Calls updateUserProfile after login
const login = useCallback(async (email, password, name, role) => {
  const result = await signInWithEmail(email, password);

  // Update profile with name and role if provided
  if (name || role) {
    await updateUserProfile(result.user.id, name, role);
  }

  // Set auth state and return
  return { user: result.user, profile: updatedProfile };
}, []);
```

### 3. `src/components/auth/SignupPage.jsx` ✅ UPDATED

**Change**: Redirect to login instead of dashboard

```javascript
// OLD:
setTimeout(() => {
  navigate(
    result.profile.role === "mentor"
      ? "/mentor/dashboard"
      : "/student/dashboard"
  );
}, 300);

// NEW:
sessionStorage.setItem("pendingName", formData.name);
sessionStorage.setItem("pendingRole", formData.role);
sessionStorage.setItem("pendingEmail", formData.email);
setTimeout(() => {
  navigate("/login", {
    state: {
      email: formData.email,
      message: "Account created! Please log in.",
    },
  });
}, 300);
```

### 4. `src/components/auth/LoginPage.jsx` ✅ UPDATED

**Change**: Load pending data from signup and pass to login

```javascript
// NEW: useEffect to load pending data
useEffect(() => {
  const pendingName = sessionStorage.getItem("pendingName");
  const pendingRole = sessionStorage.getItem("pendingRole");
  // ... Use these when calling login()
}, []);

// NEW: Pass name and role to login
const result = await login(
  formData.email,
  formData.password,
  pendingData.name,
  pendingData.role
);
```

## Testing Checklist

### Test 1: Signup Flow

- [ ] Open `/signup` page
- [ ] Fill form: name="Test User", email="test@vorko.com", password="Test123!@", role="student"
- [ ] Click "Sign Up"
- [ ] ✅ Should see success message
- [ ] ✅ Should redirect to `/login` page
- [ ] ✅ Email field should be pre-filled
- [ ] ✅ Should NOT auto-login

### Test 2: Login Flow

- [ ] From `/login` page (after signup)
- [ ] Email should be pre-filled from signup
- [ ] Enter password
- [ ] Click "Sign In"
- [ ] ✅ Should succeed (profile created by trigger)
- [ ] ✅ Should redirect to `/student/dashboard` (based on role)
- [ ] ✅ Session Storage should be cleared

### Test 3: Role Handling

- [ ] Complete signup with role="mentor"
- [ ] Login with same credentials
- [ ] ✅ Should redirect to `/mentor/dashboard`
- [ ] ✅ Profile in database should have role="mentor"

### Test 4: Database Trigger Verification

Login to Supabase and check:

- [ ] `auth.users` table has new user record after signup
- [ ] `profiles` table has corresponding profile with:
  - [ ] `id` (matches auth.users.id)
  - [ ] `name` (updated from login, not signup)
  - [ ] `role` (updated from login, not signup)
  - [ ] `created_at` (from trigger)
  - [ ] `updated_at` (from profile update)

### Test 5: RLS Policy Compliance

- [ ] No errors in browser console during signup/login
- [ ] No "403 Forbidden" errors in Network tab
- [ ] No RLS policy violation messages in Supabase logs

### Test 6: Session Persistence

- [ ] After login and redirect to dashboard
- [ ] Refresh page (F5)
- [ ] ✅ Should remain logged in
- [ ] ✅ User and profile should still be loaded
- [ ] ✅ Role should be preserved

### Test 7: Sign Out

- [ ] From dashboard, logout
- [ ] ✅ Session should clear
- [ ] ✅ Should redirect to home page
- [ ] ✅ Refresh should not show protected content

### Test 8: Demo Credentials

- [ ] Click "Student: student@vorko.com / student123"
- [ ] Click "Sign In"
- [ ] If accounts exist, ✅ should login successfully
- [ ] If accounts don't exist, ✅ should show error

## Expected Error Messages (Normal)

These errors are normal and don't indicate RLS violations:

1. **"Invalid login credentials"** - Wrong email/password
2. **"User already registered"** - Signup with existing email
3. **"Email not confirmed"** - If email verification enabled
4. **"Password should be at least 6 characters"** - Client-side validation

## Expected Error Messages (Should NOT See)

These indicate RLS violations or incorrect implementation:

1. ❌ **"new row violates row-level security policy"** - Profile INSERT during signup
2. ❌ **"relation \"profiles\" does not exist"** - Database table issue
3. ❌ **"Failed to update profile"** (without trying) - Session issue
4. ❌ **Auto-redirect to dashboard after signup** - Should redirect to login

## Database Verification Queries

Run these in Supabase SQL editor to verify setup:

```sql
-- Check if new user was created by signup
SELECT id, email, created_at FROM auth.users
WHERE email = 'test@vorko.com';

-- Check if profile was auto-created by trigger
SELECT id, name, role, created_at, updated_at FROM profiles
WHERE id = (SELECT id FROM auth.users WHERE email = 'test@vorko.com' LIMIT 1);

-- Check trigger exists
SELECT trigger_name, event_object_table
FROM information_schema.triggers
WHERE trigger_name LIKE '%profile%';

-- Check RLS policies on profiles table
SELECT policyname, qual, with_check FROM pg_policies
WHERE tablename = 'profiles';
```

## Troubleshooting

### Problem: Signup succeeds but profile not created

**Solution**: Database trigger not set up. Run this in Supabase SQL:

```sql
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();
```

### Problem: Login fails with "Profile not found"

**Solution**: Profile wasn't created by trigger. Check:

1. Trigger exists and is enabled
2. Trigger function is correct
3. User has permission to insert into profiles

### Problem: RLS errors during profile update

**Solution**: RLS policy doesn't allow user to UPDATE own profile. Check:

```sql
-- Should have policy like:
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
```

## Success Criteria

✅ **All tests pass** if:

1. Signup creates auth record (no profile INSERT errors)
2. Database trigger creates profile automatically
3. Login succeeds and updates profile with name/role
4. Role-based redirect works correctly
5. Session persists after refresh
6. No RLS violations in logs

## Next Steps

After verification:

1. Deploy to production with proper Supabase configuration
2. Set up automated tests for signup/login flow
3. Monitor Supabase logs for any RLS violations
4. Implement email verification if needed
5. Add password reset functionality

---

**Last Updated**: January 18, 2025
**Status**: Ready for Testing

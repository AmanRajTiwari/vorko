# Dashboard Blank Screen Fix - Technical Diagnostic Guide

## Quick Diagnosis

If dashboard is still blank after implementing the fix, follow this guide.

---

## Step 1: Verify All Files Are Updated

### Check AppLoader

```bash
# File should exist and contain AppLoader guard
ls -la src/components/AppLoader.jsx

# Should contain: "if (isLoading) return <LoadingScreen />"
grep -n "if (isLoading)" src/components/AppLoader.jsx
```

### Check App.jsx Integration

```bash
# Should wrap routes with AppLoader
grep -A5 "<AppLoader>" src/App.jsx
```

### Check AuthContext

```bash
# Should have detailed initialization with logging
grep -n "Session restored" src/contexts/AuthContext.jsx
```

### Check ProtectedRoute

```bash
# Should NOT have isLoading check
grep -c "isLoading" src/components/auth/ProtectedRoute.jsx
# Output should be: 0 (zero occurrences)
```

---

## Step 2: Check Browser Console

### Expected Logs on Page Load

```
[Auth] Session restored: student@vorko.com, role: student
[ProtectedRoute] Checking access: isAuthenticated=true, role=student
```

### If Missing, Check for Errors

```
Look for:
- ReferenceError
- TypeError
- "Cannot read property of undefined"
- Any red errors

If found:
1. Note the error message
2. Check that all files are updated
3. Verify Supabase credentials in .env
```

---

## Step 3: Verify Supabase Configuration

### Check .env File

```bash
# Should have both credentials
cat .env

# Output should be:
# VITE_SUPABASE_URL=https://...
# VITE_SUPABASE_ANON_KEY=...
```

### Check Supabase Connection

```javascript
// In browser console
import { supabase } from "./src/lib/supabase.js";
const session = await supabase.auth.getSession();
console.log(session);

// Should show session object if logged in, or null if not
```

---

## Step 4: Check Auth State

### Monitor Auth Context

```javascript
// In browser console after adding this to a component:
import { useAuth } from "./src/contexts/AuthContext";

export function Debug() {
  const auth = useAuth();

  useEffect(() => {
    console.log("Auth state:", {
      isLoading: auth.isLoading,
      isAuthenticated: auth.isAuthenticated,
      user: auth.user?.email,
      role: auth.role,
      profile: auth.profile,
    });
  }, [auth]);

  return <div>Check console for auth state</div>;
}
```

### Expected States

#### Initial Load (No Session)

```
Auth state: {
  isLoading: true,   // Initially loading
  isAuthenticated: false,
  user: null,
  role: null,
  profile: null,
}

↓ After auth init completes ↓

Auth state: {
  isLoading: false,  // ← CRITICAL: Must be false
  isAuthenticated: false,
  user: null,
  role: null,
  profile: null,
}
```

#### After Login

```
Auth state: {
  isLoading: true,   // While fetching profile
  isAuthenticated: true,
  user: { email: 'student@vorko.com', ... },
  role: null,        // Not set yet
  profile: null,     // Not loaded yet
}

↓ After profile loads ↓

Auth state: {
  isLoading: false,  // ← CRITICAL: Must be false
  isAuthenticated: true,
  user: { email: 'student@vorko.com', ... },
  role: 'student',
  profile: { id, name, role, ... },
}
```

#### After Page Refresh (With Session)

```
Auth state: {
  isLoading: true,   // Restoring session
  isAuthenticated: false,
  user: null,
  role: null,
  profile: null,
}

↓ After session restored ↓

Auth state: {
  isLoading: true,   // Still fetching profile
  isAuthenticated: true,
  user: { email: 'student@vorko.com', ... },
  role: null,
  profile: null,
}

↓ After profile loaded ↓

Auth state: {
  isLoading: false,  // ← CRITICAL: Must be false before routes render
  isAuthenticated: true,
  user: { email: 'student@vorko.com', ... },
  role: 'student',
  profile: { id, name, role, ... },
}
```

---

## Step 5: Check Browser Storage

### Verify Session Token

```javascript
// In browser console
localStorage.getItem("sb-[project-id]-auth-token");

// When logged in: Returns token JSON
// When logged out: Returns null
```

### Expected Session Token Format

```json
{
  "access_token": "eyJ...",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "sbr_...",
  "user": {
    "id": "uuid",
    "email": "student@vorko.com",
    ...
  }
}
```

---

## Step 6: Check Network Requests

### Open DevTools Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Look for:

#### Expected Requests

```
GET auth/v1/session         → Status 200 or 401
GET rest/v1/profiles?...    → Status 200
```

#### Problem Indicators

```
403 Forbidden        → RLS policy issue
404 Not Found        → Wrong URL
500 Server Error     → Supabase issue
Timeout              → Network issue
```

---

## Step 7: Common Issues & Fixes

### Issue 1: Blank Screen Forever

**Symptoms**:

- Loading screen never disappears
- Console shows no errors

**Diagnosis**:

```javascript
// Check if getSession() is hanging
setTimeout(() => {
  const session = await supabase.auth.getSession();
  console.log('Session:', session);
}, 2000);
```

**Fix**:

- Verify Supabase credentials
- Check network connectivity
- Clear browser cookies
- Check Supabase status

### Issue 2: "Cannot read property 'id' of null"

**Symptoms**:

- Error in ProtectedRoute
- Session restored but profile missing

**Diagnosis**:

```javascript
// Session exists but profile doesn't
const session = await supabase.auth.getSession();
console.log("Session user ID:", session.user.id);

const profile = await supabase
  .from("profiles")
  .select("*")
  .eq("id", session.user.id)
  .single();
// Returns: No rows found
```

**Fix**:

- Check that profile exists in Supabase
- Check RLS policies allow SELECT
- Verify trigger created profile during signup
- Try creating profile manually

### Issue 3: Wrong Dashboard After Refresh

**Symptoms**:

- Login shows correct dashboard
- Refresh shows wrong dashboard

**Diagnosis**:

```javascript
// Check what role is being loaded
const profile = await supabase
  .from("profiles")
  .select("role")
  .eq("id", userId)
  .single();
console.log("Profile role:", profile.role);
```

**Fix**:

- Check profile.role value in database
- Verify profile was updated with correct role
- Check login sets role correctly

### Issue 4: Session Doesn't Persist on Refresh

**Symptoms**:

- Logged in, then refresh redirects to login
- Session token missing from localStorage

**Diagnosis**:

```javascript
// Check if session stored
console.log(localStorage.getItem("sb-*-auth-token"));
// Should return token JSON when logged in
```

**Fix**:

- Check that login completes successfully
- Check localStorage isn't being cleared
- Verify browser allows localStorage
- Check for app-level logout

---

## Step 8: Performance Check

### Measure Loading Time

```javascript
// In browser console
performance.getEntriesByType("navigation")[0];
// Check: domContentLoaded, loadEventEnd
// Should be < 3000ms for complete load
```

### Expected Timeline

```
0ms:      Navigation starts
100ms:    HTML downloads
200ms:    CSS/JS downloads
300ms:    React loads
400ms:    AuthContext initializes
500ms:    Session restored from storage
600ms:    Profile fetched from Supabase
700ms:    Auth state updated (isLoading = false)
800ms:    Router renders
900ms:    Dashboard renders and visible
```

---

## Step 9: Enable Detailed Logging

### Add Debug Mode to AuthContext

```javascript
// Add at top of initializeAuth function
console.time("Auth Init");

// Add throughout:
console.log("[Step 1] Checking Supabase config");
console.log("[Step 2] Restoring session...");
console.log("[Step 3] Session:", session?.user?.email);
console.log("[Step 4] Fetching profile...");
console.log("[Step 5] Profile loaded:", profile?.role);

// Add at end:
console.timeEnd("Auth Init");
```

### Check Console Output

```
Auth Init: 456ms
[Step 1] Checking Supabase config
[Step 2] Restoring session...
[Step 3] Session: student@vorko.com
[Step 4] Fetching profile...
[Step 5] Profile loaded: student
```

---

## Step 10: Recovery Checklist

If everything seems broken:

- [ ] Stop dev server (Ctrl+C)
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Delete node_modules: `rm -rf node_modules`
- [ ] Reinstall: `npm install`
- [ ] Restart dev server: `npm run dev`
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Try logging in again
- [ ] Check console for errors

---

## Quick Reference

### Files to Check

```
src/components/AppLoader.jsx          ← Main guard
src/App.jsx                           ← Integration
src/contexts/AuthContext.jsx          ← Initialization
src/components/auth/ProtectedRoute.jsx ← Route guard
src/lib/auth.js                       ← Auth utilities
src/lib/supabase.js                   ← Supabase client
```

### Critical State

```
isLoading: false  ← Must be true only during init
session: loaded   ← From getSession()
profile: loaded   ← From getCurrentProfile()
user: set         ← From session
role: set         ← From profile
```

### Key Functions

```
getSession()           ← Restores session from localStorage
getCurrentProfile()    ← Fetches profile from database
onAuthStateChange()    ← Listens for auth changes
```

---

## Contact & Support

If you're still having issues:

1. Check all files are updated correctly
2. Verify Supabase credentials
3. Check console for error messages
4. Follow the diagnostic steps above
5. Check that AppLoader wraps Router
6. Ensure AuthContext completes before routes render

---

**Last Updated**: January 18, 2026  
**For Issue**: Dashboard blank screen after page refresh

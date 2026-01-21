# UI Loading State Fix - Testing & Verification

## Quick Start Testing

### Test 1: Verify AppLoader is Active ✅

**In browser DevTools Console, run**:

```javascript
// Should see: true (loading during startup, false after)
console.log("Auth Context Status");
```

**Steps**:

1. Open http://localhost:5174
2. Open DevTools (F12)
3. Console tab
4. Observe messages: "Loading Vorko..." → "Authenticating..."
5. ✅ Should NOT see blank screen at any point

### Test 2: Session Restoration ✅

**Steps**:

1. Go to http://localhost:5174/login
2. Login with demo credentials:
   - Email: `student@vorko.com`
   - Password: `student123`
3. ✅ Should redirect to /student/dashboard
4. ✅ Dashboard loads with data
5. **Refresh page (F5)**
6. ✅ Should show loading screen briefly
7. ✅ Should restore session WITHOUT redirecting to login
8. ✅ Dashboard still visible with all data

### Test 3: Protected Routes ✅

**Steps**:

1. Open DevTools → Application → Storage → Cookies
2. Delete any auth-related cookies/localStorage
3. Navigate to http://localhost:5174/student/dashboard
4. ✅ Should show "Authenticating..." screen
5. ✅ Should redirect to /login (not blank screen)

### Test 4: Role-Based Routing ✅

**Steps**:

1. Login as student
2. Try to access /mentor/dashboard
3. ✅ Should redirect to /student/dashboard
4. ✅ No blank screen during redirect

### Test 5: Logout ✅

**Steps**:

1. From dashboard, logout
2. ✅ Session cleared
3. Navigate to /student/dashboard
4. ✅ Redirected to /login
5. Refresh page
6. ✅ Still on /login (session not restored)

## Console Output to Watch For

### Healthy Startup (No Session)

```
Supabase not configured - running in demo mode
[Or if configured:]
Initializing auth...
Auth state initialized successfully
Loading Vorko... (appears on screen)
[After loading completes:]
Landing page renders
```

### Healthy Startup (With Session)

```
Supabase configured
Initializing auth...
Session found, restoring...
Fetching profile...
Profile loaded: { name, role, ... }
Auth state ready, isLoading: false
[Loading screen disappears]
Dashboard renders with data
```

### Healthy Signup → Login Flow

```
[Signup page]
Account created successfully!
[Redirects to Login page]
Email pre-filled
[User enters password, clicks login]
Authenticating user...
Fetching profile...
Profile updated with name and role
[Redirects to dashboard]
Dashboard renders
```

## Manual Testing Scenarios

### Scenario 1: Fresh User

```
1. Clear all localStorage (DevTools → Application → Storage → LocalStorage)
2. Go to http://localhost:5174
3. ✅ Landing page loads (no session)
4. Sign up with new account
5. ✅ Redirected to login page
6. Login with same credentials
7. ✅ Redirected to dashboard
8. Refresh page
9. ✅ Session restored, dashboard still visible
```

### Scenario 2: Session Expiry Simulation

```
1. Login to dashboard
2. Open DevTools → Application → Cookies
3. Find and delete auth session cookie
4. Refresh page
5. ✅ Should redirect to login
6. [Note: Full session expiry requires Supabase config]
```

### Scenario 3: Network Error Simulation

```
1. Open DevTools → Network tab
2. Set throttling to "Offline"
3. Refresh page
4. ✅ Loading screen appears
5. ✅ If session in storage, should still load
6. ✅ If no session, should show error or redirect
7. Set throttling back to "No throttling"
8. Page should recover
```

## Files to Verify

### 1. AppLoader Component ✅

File: `src/components/AppLoader.jsx`

**Should contain**:

- ✅ Loading screen with Vorko logo and spinner
- ✅ Checks `isLoading` from useAuth()
- ✅ Returns full-screen loading while loading
- ✅ Returns children when ready

**Test**: Navigate to any protected route, should see loading screen

### 2. App.jsx Integration ✅

File: `src/App.jsx`

**Should contain**:

- ✅ Import of AppLoader
- ✅ AppLoader wrapping all routes
- ✅ AppLoader inside AuthProvider

**Structure**:

```
<AuthProvider>
  <AppLoader>          ← Gates all routes
    <DataProvider>
      <StudentDataProvider>
        <Router>
          <AppRoutes />
        </Router>
      </StudentDataProvider>
    </DataProvider>
  </AppLoader>
</AuthProvider>
```

### 3. AuthContext ✅

File: `src/contexts/AuthContext.jsx`

**Should contain**:

- ✅ `isMounted` flag in useEffect
- ✅ `getSession()` call to restore session
- ✅ `getCurrentProfile()` call to fetch profile
- ✅ `onAuthStateChange()` subscription for real-time updates
- ✅ Error handling with try-catch
- ✅ Cleanup in return of useEffect

**Key code patterns**:

```javascript
let isMounted = true;  // ← Mounted flag

const initializeAuth = async () => {
  try {
    const session = await getSession();  // ← Restore session
    if (session?.user) {
      const profile = await getCurrentProfile(session.user.id);  // ← Fetch profile
      if (isMounted) setAuth(...);  // ← Check before setState
    }
  } catch (error) { ... }
};

return () => {
  isMounted = false;  // ← Cleanup
};
```

## Browser DevTools Checks

### 1. localStorage Check

```
Open DevTools → Application → Storage → LocalStorage
Look for key: `sb-[project-id]-auth-token`

When logged in: ✅ Key should exist
When logged out: ✅ Key should NOT exist
After logout: ✅ Key should be deleted
```

### 2. Network Check

```
Open DevTools → Network tab
Filter by: XHR or Fetch

Expected calls during login:
1. POST /auth/v1/token (sign in)
2. GET /rest/v1/profiles?... (fetch profile)

Expected calls on page refresh with session:
1. GET /auth/v1/user (verify session)
2. GET /rest/v1/profiles?... (fetch profile)

Both should have Status: 200
```

### 3. Console Check

```
Open DevTools → Console tab

✅ Should NOT see:
- "Blank screen" or undefined errors
- "Cannot read property of undefined"
- 403 Forbidden errors
- RLS policy violations

✅ Should see (normal):
- "Authenticating..."
- Profile fetch logs
- Auth state changes
```

## Performance Metrics

### Expected Timings

- **Page load (no session)**: <2 seconds
- **Page load (with session)**: <3 seconds
- **Login**: <2 seconds
- **Redirect after login**: <1 second
- **Session restoration**: <1 second

### Performance Check

```javascript
// In browser console
performance.getEntriesByType("navigation")[0];
// Look for: domContentLoaded, loadEventEnd < 3000ms
```

## Debugging Commands

### Check Auth State

```javascript
// In browser console, from any page
// (only works after AuthProvider renders)
const context = React.useContext(AuthContext);
console.log(context);
// Shows: { user, profile, role, isAuthenticated, isLoading, error }
```

### Check Session Storage

```javascript
// In browser console
const session = await supabase.auth.getSession();
console.log(session);
// Shows current session or null
```

### Check Profile in Database

```javascript
// In Supabase dashboard
SELECT * FROM profiles WHERE id = '[current-user-id]';
// Shows profile with name, role, created_at, updated_at
```

## Success Criteria

✅ **All tests passing if**:

1. No blank screens at any point during navigation
2. Loading screen appears during authentication checks
3. Session restores on page refresh
4. Role-based redirects work correctly
5. Logout clears session and redirects properly
6. Protected routes show loading while checking auth
7. Dashboard loads with all data visible
8. Console has no auth-related errors

## Issue Resolution

### Issue: Still seeing blank screen

**Debug**:

1. Check console for errors
2. Verify AppLoader component exists
3. Verify App.jsx wraps routes with AppLoader
4. Check isLoading state in React DevTools

**Fix**:

1. Clear cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Check Supabase credentials in .env

### Issue: Loading screen never disappears

**Debug**:

1. Check if getSession() is blocking
2. Check if getCurrentProfile() is blocking
3. Check console for errors

**Fix**:

```javascript
// Add console logs to track
console.log("Starting session check...");
const session = await getSession();
console.log("Session:", session);
```

### Issue: Session not persisting

**Debug**:

1. Check localStorage for auth token
2. Check getSession() returns session
3. Check profile fetch succeeds

**Fix**:

1. Verify Supabase credentials
2. Check RLS policies allow profile SELECT
3. Test with demo credentials first

## Production Deployment

### Pre-deployment Checklist

- [ ] Test all scenarios above
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Monitor console for errors
- [ ] Check Supabase logs
- [ ] Verify .env has real credentials
- [ ] Test with real database

### Post-deployment Monitoring

- [ ] Monitor error logs
- [ ] Track session restoration timing
- [ ] Monitor for "blank screen" user reports
- [ ] Check Supabase auth metrics
- [ ] Verify session persistence

---

**Last Updated**: January 18, 2026
**Status**: Ready for Testing ✅

# UI Loading State Fix - Implementation Guide

## Problem Identified

After authentication, the UI was showing blank screens because:

1. Auth state initialization was happening but UI rendered before it completed
2. No loading guard prevented routes from rendering during session restoration
3. App components rendered while `isLoading: true` without proper UI feedback
4. Session persistence required proper session restoration logic

## Solution Architecture

### 1. AppLoader Component

**Purpose**: Gate the entire app until authentication is initialized

**Location**: `src/components/AppLoader.jsx`

**How it works**:

```javascript
export function AppLoader({ children }) {
  const { isLoading } = useAuth();

  // While isLoading is true, show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Auth is ready, render app
  return children;
}
```

**Wrapped in App.jsx**:

```javascript
<AuthProvider>
  <AppLoader>
    {" "}
    {/* ← Guards routes until auth ready */}
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

### 2. Enhanced AuthContext

**Purpose**: Proper session restoration and loading state management

**Key Enhancements**:

#### a) Session Restoration on Mount

```javascript
useEffect(() => {
  let isMounted = true; // ← Prevent state updates after unmount

  const initializeAuth = async () => {
    // Step 1: Check if Supabase configured
    // Step 2: Call getSession() to restore session from storage
    const session = await getSession();

    if (session?.user) {
      // Step 3: Fetch user profile
      const profile = await getCurrentProfile(session.user.id);

      // Step 4: Set auth state
      setAuth({ user, profile, isAuthenticated: true, isLoading: false });
    } else {
      // No session, mark loading as complete
      setAuth((prev) => ({ ...prev, isLoading: false }));
    }
  };

  initializeAuth();

  // Set isMounted to false on cleanup
  return () => {
    isMounted = false;
  };
}, []);
```

#### b) Real-time Auth State Changes

```javascript
// After initialization, subscribe to auth changes
subscription = onAuthStateChange(async (event, session) => {
  if (event === "SIGNED_IN" && session?.user) {
    // User signed in - fetch profile
    const profile = await getCurrentProfile(session.user.id);
    setAuth({ user: session.user, profile, isAuthenticated: true });
  } else if (event === "SIGNED_OUT") {
    // User signed out - clear state
    setAuth({ user: null, isAuthenticated: false });
  }
});
```

#### c) Mounted Check

```javascript
// Prevent state updates after component unmount
// This prevents memory leaks and "Can't perform a React state update on an unmounted component" warnings
let isMounted = true;

return () => {
  isMounted = false;
};
```

### 3. ProtectedRoute with Loading State

**Purpose**: Guard routes AND show loading during auth check

**Existing in `src/components/auth/ProtectedRoute.jsx`**:

```javascript
export function ProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, role, isLoading } = useAuth();

  // ← Shows loading screen while checking auth
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // ← Redirects if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // ← Redirects if wrong role
  if (allowedRole && role !== allowedRole) {
    return <Navigate to={correctDashboard} />;
  }

  // ← All checks passed, render component
  return children;
}
```

## Data Flow During Startup

```
App Mounts
  ↓
AuthProvider initializes
  ├─ state: { isLoading: true, user: null, isAuthenticated: false }
  ├─ useEffect() triggered
  │   ├─ Call getSession() ← Restores session from localStorage
  │   ├─ If session exists:
  │   │   ├─ Fetch profile from DB
  │   │   └─ setAuth({ user, profile, isAuthenticated: true, isLoading: false })
  │   ├─ If no session:
  │   │   └─ setAuth({ isLoading: false })
  │   └─ Subscribe to onAuthStateChange()
  ↓
AppLoader receives updated auth state
  ├─ While isLoading === true:
  │   └─ Render LoadingScreen (Vorko logo + spinner)
  ├─ When isLoading === false:
  │   └─ Render all child routes
  ↓
Router and Routes render
  ├─ Public routes (/login, /signup, /) → Render immediately
  ├─ Protected routes → Check ProtectedRoute
  │   ├─ If isLoading → Show loading
  │   ├─ If not authenticated → Redirect to /login
  │   ├─ If authenticated but wrong role → Redirect to correct dashboard
  │   ├─ If authenticated and correct role → Render component
  ↓
Components render with fully loaded user/profile/role data
```

## Session Persistence Flow

### Scenario 1: User Logs In

```
1. User submits login form
2. signInWithEmail() calls supabase.auth.signInWithPassword()
3. Supabase stores session in localStorage (automatically)
4. Session stored in browser

When page refreshes:
1. AuthProvider.useEffect() runs
2. getSession() reads from localStorage
3. Session restored automatically
4. Profile fetched and loaded
5. User stays logged in ✅
```

### Scenario 2: User Signs Out

```
1. User clicks logout
2. signOut() calls supabase.auth.signOut()
3. Supabase removes session from localStorage
4. Auth state cleared

When page refreshes:
1. AuthProvider.useEffect() runs
2. getSession() returns null (no session)
3. isLoading set to false
4. User redirected to home page ✅
```

### Scenario 3: Session Expires

```
1. Supabase detects session expired
2. onAuthStateChange() triggered with SIGNED_OUT event
3. Auth state cleared automatically
4. User redirected to login ✅
```

## Key Implementation Details

### 1. isMounted Flag

Prevents "Can't perform a React state update on an unmounted component" error:

```javascript
let isMounted = true;

const initializeAuth = async () => {
  // ... do async work
  if (!isMounted) return;  // ← Check before setState
  setAuth(...);
};

return () => {
  isMounted = false;  // ← Mark unmounted in cleanup
};
```

### 2. Profile Error Handling

If profile fetch fails but session exists, continue with user:

```javascript
try {
  const profile = await getCurrentProfile(userId);
  // Use profile
} catch (error) {
  console.warn("Profile fetch failed, continuing with user");
  // Continue with user, profile will be null
  setAuth({ user, isAuthenticated: true, isLoading: false });
}
```

### 3. Session Storage

Supabase automatically handles session storage:

- **Stores in**: `localStorage` under `sb-{project-id}-auth-token`
- **Accessible**: Across browser tabs/windows
- **Expires**: When session expires (configurable in Supabase)
- **Restored**: Automatically by `getSession()`

## Testing Checklist

### Test 1: Initial Load - Logged Out

```
1. Start fresh (no session)
2. Navigate to http://localhost:5173
3. ✅ Should see loading screen briefly
4. ✅ Should see landing page after loading completes
5. ✅ No blank screen
```

### Test 2: Initial Load - Logged In

```
1. Login with credentials
2. Refresh page (F5)
3. ✅ Should show loading screen
4. ✅ Should restore session
5. ✅ Should show dashboard without redirects
6. ✅ User/profile data loaded
```

### Test 3: Protected Route - Not Logged In

```
1. Logout or clear localStorage
2. Navigate directly to /student/dashboard
3. ✅ Should show loading screen
4. ✅ Should check authentication
5. ✅ Should redirect to /login (not blank screen)
```

### Test 4: Protected Route - Logged In

```
1. Login as student
2. Navigate to /student/dashboard
3. ✅ Should show loading screen
4. ✅ Should load and display dashboard
5. ✅ All data visible
```

### Test 5: Protected Route - Wrong Role

```
1. Login as student
2. Navigate to /mentor/dashboard
3. ✅ Should show loading screen
4. ✅ Should redirect to /student/dashboard
5. ✅ No blank screen
```

### Test 6: Session Persistence

```
1. Login to dashboard
2. Open DevTools → Application → LocalStorage
3. ✅ Should see `sb-{project-id}-auth-token` key
4. Refresh page
5. ✅ Should restore session immediately
6. ✅ Dashboard loads without re-login
```

### Test 7: Logout

```
1. From dashboard, click logout
2. ✅ Session cleared from localStorage
3. ✅ Redirected to home page
4. Navigate to /student/dashboard
5. ✅ Redirected to /login
6. ✅ Session not restored
```

### Test 8: Quick Navigation

```
1. Login to dashboard
2. Immediately click links to different pages
3. ✅ Each route shows loading while checking role
4. ✅ Correct page displays
5. ✅ No blank screens
```

## Files Modified

| File                                     | Changes                                          |
| ---------------------------------------- | ------------------------------------------------ |
| `src/components/AppLoader.jsx`           | NEW - Loading gate for entire app                |
| `src/App.jsx`                            | Import AppLoader, wrap routes with it            |
| `src/contexts/AuthContext.jsx`           | Enhanced session restoration with isMounted flag |
| `src/components/auth/ProtectedRoute.jsx` | Already had loading state - no changes needed    |

## Production Checklist

- [ ] Test all scenarios above in development
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Monitor console for errors
- [ ] Check Supabase logs for auth issues
- [ ] Deploy to production
- [ ] Monitor user feedback for blank screens

## Troubleshooting

### Issue: Still seeing blank screens

**Solution**:

1. Check browser console for errors
2. Verify AppLoader is wrapping routes
3. Verify AuthContext is providing isLoading state
4. Check Supabase credentials in .env

### Issue: Session not persisting after refresh

**Solution**:

1. Verify getSession() is called in useEffect
2. Check localStorage for `sb-*-auth-token` key
3. Verify no errors in console during initialization
4. Check Supabase session expiration time

### Issue: Loading spinner appears forever

**Solution**:

1. Check getSession() doesn't error (should return null, not throw)
2. Check getCurrentProfile() doesn't error
3. Add error logging to see which step fails
4. Check Supabase credentials and permissions

## Performance Notes

- **Loading time**: Should be <100ms for local users with cached session
- **Session restoration**: ~50-100ms with network latency
- **Profile fetch**: ~100-200ms depending on network
- **Total startup**: Usually <500ms with modern connection

## Security Notes

✅ **Session Security**:

- Supabase manages session tokens securely
- Tokens stored in httpOnly cookies or localStorage
- Tokens automatically refreshed before expiration
- Tokens cleared on logout

✅ **RLS Enforcement**:

- Profile data fetched with user's session token
- RLS policies enforce user can only see own profile
- No unauthorized data access possible

---

**Implementation Date**: January 18, 2026
**Status**: Ready for Testing ✅

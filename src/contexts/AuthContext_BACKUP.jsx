import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  signUpWithEmail,
  signInWithEmail,
  updateUserProfile,
  getCurrentProfile,
  signOut,
  getSession,
  onAuthStateChange,
} from "../lib/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,
    profile: null,
    role: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // ===== EFFECT 1: Initialize auth on mount (restore session) =====
  useEffect(() => {
    let isMounted = true;
    hasRedirectedRef.current = false; // Reset redirect flag on mount

    const initializeAuth = async () => {
      try {
        // Check if Supabase is configured
        if (
          !import.meta.env.VITE_SUPABASE_URL ||
          !import.meta.env.VITE_SUPABASE_ANON_KEY
        ) {
          console.warn("[Auth] Supabase not configured - demo mode");
          if (isMounted) {
            setAuth((prev) => ({ ...prev, isLoading: false }));
          }
          return;
        }

        // Try to restore session from localStorage
        const session = await getSession();
        if (!isMounted) return;

        if (session?.user) {
          // Session exists - fetch profile
          try {
            const profile = await getCurrentProfile(session.user.id);
            if (!isMounted) return;

            const newAuthState = {
              user: session.user,
              profile: profile || null,
              role: profile?.role || "student",
              isAuthenticated: true,
              isLoading: false,
              error: null,
            };

            setAuth(newAuthState);
            console.log(
              `[Auth] Session restored: ${session.user.email}, role: ${newAuthState.role}`
            );

            // ===== REDIRECT: Session restored and authenticated =====
            // This is the ONLY place redirects happen on initialization
            if (!hasRedirectedRef.current) {
              hasRedirectedRef.current = true;
              const dashboardUrl =
                newAuthState.role === "mentor"
                  ? "/mentor/dashboard"
                  : "/student/dashboard";

              // Don't redirect if already on dashboard
              if (
                !window.location.pathname.includes("/dashboard") &&
                !window.location.pathname.includes("/projects") &&
                !window.location.pathname.includes("/meetings")
              ) {
                console.log(
                  `[Auth] Redirecting to ${dashboardUrl} after session restore`
                );
                navigate(dashboardUrl, { replace: true });
              }
            }
          } catch (profileError) {
            console.warn("[Auth] Profile fetch failed:", profileError);
            if (isMounted) {
              setAuth((prev) => ({
                ...prev,
                user: session.user,
                isAuthenticated: true,
                isLoading: false,
              }));
            }
          }
        } else {
          // No session - user is logged out
          if (isMounted) {
            setAuth((prev) => ({ ...prev, isLoading: false }));
          }
          console.log("[Auth] No session found");
        }
      } catch (error) {
        console.error("[Auth] Initialization error:", error);
        if (isMounted) {
          setAuth((prev) => ({
            ...prev,
            isLoading: false,
            error: error.message,
          }));
        }
      }
    };

    initializeAuth();

    // Setup real-time auth listener
    let subscription = null;
    try {
      subscription = onAuthStateChange(async (event, session) => {
        if (!isMounted) return;

        if (event === "SIGNED_IN" && session?.user) {
          console.log("[Auth] SIGNED_IN event:", session.user.email);
          try {
            const profile = await getCurrentProfile(session.user.id);
            if (isMounted) {
              setAuth((prev) => ({
                ...prev,
                user: session.user,
                profile: profile || prev.profile,
                role: profile?.role || prev.role,
                isAuthenticated: true,
                error: null,
              }));
            }
          } catch (error) {
            console.warn("[Auth] Profile fetch failed on SIGNED_IN:", error);
            if (isMounted) {
              setAuth((prev) => ({
                ...prev,
                user: session.user,
                isAuthenticated: true,
              }));
            }
          }
        } else if (event === "SIGNED_OUT") {
          console.log("[Auth] SIGNED_OUT event");
          if (isMounted) {
            setAuth({
              user: null,
              profile: null,
              role: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
            hasRedirectedRef.current = false;
            navigate("/login", { replace: true });
          }
        }
      });
    } catch (error) {
      console.error("[Auth] Error setting up listener:", error);
    }

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [navigate]);

  // ===== EFFECT 2: Handle redirects when auth state changes =====
  // Watch for authenticated state changes and redirect to dashboard
  // This happens AFTER login() or session restore
  useEffect(() => {
    if (
      auth.isAuthenticated &&
      auth.user &&
      auth.profile?.role &&
      !auth.isLoading
    ) {
      // Auth is complete (user + profile loaded)
      // Redirect to appropriate dashboard
      if (!hasRedirectedRef.current) {
        hasRedirectedRef.current = true;

        const dashboardUrl =
          auth.role === "mentor" ? "/mentor/dashboard" : "/student/dashboard";

        // Only redirect if we're not already there
        if (!window.location.pathname.includes("/dashboard")) {
          console.log(`[Auth] Redirecting to ${dashboardUrl}`);
          navigate(dashboardUrl, { replace: true });
        }
      }
    }
  }, [
    auth.isAuthenticated,
    auth.user,
    auth.profile?.role,
    auth.isLoading,
    navigate,
  ]);

  // Login function
  // Redirect happens automatically via useEffect above when auth state updates
  const login = useCallback(async (email, password, name, role) => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true, error: null }));
      hasRedirectedRef.current = false; // Allow redirect after login

      const result = await signInWithEmail(email, password);
      if (!result || !result.user) {
        throw new Error("Login failed: No user returned");
      }

      // Update profile if provided
      let profileData = result.profile;
      if (name || role) {
        try {
          profileData = await updateUserProfile(
            result.user.id,
            name || result.profile.name,
            role || result.profile.role
          );
        } catch (updateError) {
          console.warn("[Auth] Profile update failed:", updateError);
        }
      }

      // Update auth state - this triggers the redirect useEffect above
      setAuth({
        user: result.user,
        profile: profileData,
        role: profileData?.role || "student",
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      console.log(`[Auth] Login successful: ${result.user.email}`);

      return {
        user: result.user,
        profile: profileData,
      };
    } catch (error) {
      const errorMessage = error.message || "Login failed";
      console.error("[Auth] Login error:", errorMessage);

      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      throw error;
    }
  }, []);

  // Signup function - no redirect here, user goes to login
  const signup = useCallback(async (name, email, password, role) => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true, error: null }));

      const result = await signUpWithEmail(email, password);

      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));

      return {
        user: result.user,
        name,
        email,
        role,
      };
    } catch (error) {
      const errorMessage = error.message || "Signup failed";
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true }));
      hasRedirectedRef.current = false;

      await signOut();

      setAuth({
        user: null,
        profile: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      // Redirect to login happens via useEffect watching SIGNED_OUT event
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("[Auth] Logout error:", error);
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
      throw error;
    }
  }, [navigate]);

  // Check if user has required role
  const hasRole = useCallback(
    (requiredRole) => {
      return auth.isAuthenticated && auth.role === requiredRole;
    },
    [auth.isAuthenticated, auth.role]
  );

  // Utility to get dashboard URL based on role
  const getDashboardUrl = useCallback(() => {
    if (auth.role === "mentor") {
      return "/mentor/dashboard";
    }
    return "/student/dashboard";
  }, [auth.role]);

  const value = {
    ...auth,
    login,
    signup,
    logout,
    hasRole,
    getDashboardUrl,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

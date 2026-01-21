import React from "react";
import { useAuth } from "../contexts/AuthContext";

/**
 * AppLoader - CRITICAL: Prevents Router from rendering until authentication is fully initialized
 *
 * This is the main guard against blank screens. It prevents React Router from even
 * rendering routes while auth state is still being restored from Supabase.
 *
 * Without this guard, there's a race condition where:
 * 1. Router renders routes before auth is ready
 * 2. ProtectedRoute mounts while isLoading is true
 * 3. ProtectedRoute shows loading spinner
 * 4. Auth finishes initializing
 * 5. Component finally renders (but user saw blank screen briefly)
 *
 * With AppLoader, we ensure:
 * 1. Auth is FULLY initialized (isLoading = false)
 * 2. Router never renders until auth is done
 * 3. First route render is with complete auth data
 * 4. No blank screens, no loading spinners, smooth transition
 */
export function AppLoader({ children }) {
  const context = useAuth();
  const isLoading = context.isLoading;

  // CRITICAL: While auth is initializing, do NOT render Router at all
  // This prevents the race condition entirely
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-dark via-dark to-dark-lighter">
        {/* Background decorations - same as landing page for visual consistency */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent/10 to-accent-purple/10 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 -left-40 w-96 h-96 bg-gradient-to-tr from-accent-purple/10 to-accent-blue/10 rounded-full blur-3xl opacity-20"></div>
        </div>

        {/* Loading content */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Animated Vorko logo */}
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-purple rounded-lg flex items-center justify-center font-bold text-dark text-3xl animate-pulse">
            V
          </div>

          {/* Loading spinner */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium">
              Restoring your session...
            </p>
          </div>

          {/* Helpful message */}
          <p className="text-xs text-gray-500 mt-4 max-w-xs text-center">
            Verifying authentication and loading your profile
          </p>
        </div>
      </div>
    );
  }

  // Auth is ready - NOW render the router and all routes
  // At this point:
  // - session is restored from Supabase
  // - profile is fetched from database
  // - isLoading is false
  // - user and role are set
  // - ProtectedRoute can immediately check permissions without loading state
  return children;
}

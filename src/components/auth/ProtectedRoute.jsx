import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/**
 * ProtectedRoute - Guards routes based on authentication and role
 *
 * IMPORTANT: This component should ONLY:
 * 1. Check if user is authenticated
 * 2. Check if user has required role
 * 3. Block unauthorized access by redirecting to /login
 *
 * DOES NOT handle role-based redirects - that's done in AuthContext only!
 * AuthContext is the SINGLE SOURCE OF TRUTH for all redirects.
 *
 * By the time ProtectedRoute mounts (via AppLoader):
 * - isLoading is false (AppLoader waits for this)
 * - user and profile are fully loaded
 * - role is set
 *
 * Props:
 * - children: Component to render if authorized
 * - allowedRole: Required role to access (optional: 'student' or 'mentor')
 */
export function ProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, role, user, isLoading } = useAuth();

  // Debug logging
  if (process.env.NODE_ENV === "development") {
    console.debug(`[ProtectedRoute] Checking access:`, {
      isAuthenticated,
      role,
      allowedRole,
      userEmail: user?.email,
      isLoading,
    });
  }

  // CHECK 1: Is user authenticated?
  if (!isAuthenticated || !user) {
    console.debug("[ProtectedRoute] Not authenticated - redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  // CHECK 2: Does user have the required role?
  if (allowedRole && role !== allowedRole) {
    // Role mismatch - this shouldn't normally happen because AuthContext
    // redirects to correct dashboard based on role. But if it does,
    // redirect back to home instead of silently failing.
    console.warn(
      `[ProtectedRoute] Role mismatch: required ${allowedRole}, got ${role}`
    );
    return <Navigate to="/" replace />;
  }

  // ALL CHECKS PASSED - render the protected component
  return children;
}

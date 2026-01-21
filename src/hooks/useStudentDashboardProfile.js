import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Hook to fetch student's complete profile for dashboard display
 * Includes name, email, avatar, and role information
 * @param {string} userId - The authenticated user's ID
 * @returns {Object} - { profile, loading, error }
 */
export function useStudentDashboardProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        if (!userId) {
          setLoading(false);
          return;
        }

        const { data, error: err } = await supabase
          .from("profiles")
          .select("id, name, email, role")
          .eq("id", userId)
          .single();

        if (err) throw err;

        if (isMounted) {
          setProfile(data);
          setError(null);
        }
      } catch (err) {
        console.error("[useStudentDashboardProfile] Error:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { profile, loading, error };
}

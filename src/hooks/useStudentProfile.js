import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Hook to fetch the logged-in student's profile data
 * @param {string} userId - The authenticated user's ID
 * @returns {Object} - { profile, loading, error }
 */
export function useStudentProfile(userId) {
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
          .select("*")
          .eq("id", userId)
          .single();

        if (err) throw err;

        if (isMounted) {
          setProfile(data);
          setError(null);
        }
      } catch (err) {
        console.error("[useStudentProfile] Error:", err);
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

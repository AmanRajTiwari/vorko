import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Hook to fetch reports submitted by the logged-in student
 * @param {string} userId - The authenticated user's ID
 * @returns {Object} - { reports, loading, error }
 */
export function useStudentReports(userId) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchReports = async () => {
      try {
        // Guard: Prevent API calls without valid user
        if (!userId) {
          console.warn("[useStudentReports] No userId provided");
          setLoading(false);
          return;
        }

        const { data, error: err } = await supabase
          .from("reports")
          .select("*")
          .eq("submitted_by", userId)
          .order("created_at", { ascending: false })
          .limit(10);

        if (err) {
          console.warn("Reports fetch failed", err?.message);
          if (isMounted) {
            setError(err.message);
            setReports([]);
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setReports(data || []);
          setError(null);
        }
      } catch (err) {
        console.error("[useStudentReports] Error:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchReports();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { reports, loading, error };
}

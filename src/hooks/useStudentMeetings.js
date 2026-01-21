import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Hook to fetch meetings for the logged-in student's project
 * @param {string} projectId - The student's project ID
 * @returns {Object} - { meetings, loading, error }
 */
export function useStudentMeetings(projectId) {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMeetings = async () => {
      try {
        if (!projectId) {
          setLoading(false);
          return;
        }

        const { data, error: err } = await supabase
          .from("meetings")
          .select("*")
          .eq("project_id", projectId)
          .gte("scheduled_at", new Date().toISOString())
          .order("scheduled_at", { ascending: true })
          .limit(10);

        if (err) {
          console.warn("Meetings fetch failed", err?.message);
          if (isMounted) {
            setError(err.message);
            setMeetings([]);
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setMeetings(data || []);
          setError(null);
        }
      } catch (err) {
        console.error("[useStudentMeetings] Error:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMeetings();

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  return { meetings, loading, error };
}

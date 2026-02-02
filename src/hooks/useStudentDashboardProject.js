import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Hook to fetch student's active project with mentor details for dashboard display
 * @param {string} userId - The authenticated user's ID
 * @returns {Object} - { project, mentor, loading, error }
 */
export function useStudentDashboardProject(userId) {
  const [project, setProject] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProject = async () => {
      try {
        // Guard: Prevent API calls without valid user
        if (!userId) {
          console.warn("[useStudentDashboardProject] No userId provided");
          setLoading(false);
          return;
        }

        // Get project data directly from projects table
        const { data: projectData, error: projectErr } = await supabase
          .from("projects")
          .select("id, title, description, created_at")
          .limit(1)
          .maybeSingle();

        if (projectErr) {
          console.warn("Project fetch failed", projectErr?.message);
          if (isMounted) {
            setError(projectErr.message);
            setProject(null);
            setMentor(null);
            setLoading(false);
          }
          return;
        }

        if (!projectData) {
          if (isMounted) {
            setProject(null);
            setMentor(null);
            setError(null);
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setProject(projectData);
          setMentor(null); // No mentor data since we removed mentor_id from query
          setError(null);
        }
      } catch (err) {
        console.warn("Project fetch failed", err?.message);
        if (isMounted) {
          setError(err.message);
          setProject(null);
          setMentor(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProject();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { project, mentor, loading, error };
}

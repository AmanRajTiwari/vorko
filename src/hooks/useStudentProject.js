import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Hook to fetch the logged-in student's active project
 * @param {string} userId - The authenticated user's ID
 * @returns {Object} - { project, loading, error }
 */
export function useStudentProject(userId) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProject = async () => {
      try {
        if (!userId) {
          setLoading(false);
          return;
        }

        // Get the student's project membership
        const { data: membership, error: memberError } = await supabase
          .from("project_members")
          .select("project_id")
          .eq("student_id", userId)
          .limit(1);

        if (memberError) throw memberError;

        if (!membership || membership.length === 0) {
          if (isMounted) {
            setProject(null);
            setLoading(false);
          }
          return;
        }

        // Get the project details
        const { data: projectData, error: projError } = await supabase
          .from("projects")
          .select(
            `
            id,
            title,
            description,
            status,
            progress,
            start_date,
            end_date,
            mentor_id,
            created_at,
            mentor:mentor_id(id, name, email, expertise)
          `
          )
          .eq("id", membership[0].project_id)
          .single();

        if (projError) throw projError;

        if (isMounted) {
          setProject(projectData);
          setError(null);
        }
      } catch (err) {
        console.error("[useStudentProject] Error:", err);
        if (isMounted) {
          setError(err.message);
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

  return { project, loading, error };
}

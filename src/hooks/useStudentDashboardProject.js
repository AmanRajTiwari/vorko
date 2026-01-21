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

        // First, get project data from project_members → projects
        const { data: projectData, error: projectErr } = await supabase
          .from("project_members")
          .select(
            `
            project_id,
            projects (
              id,
              title,
              description,
              status,
              progress,
              created_at,
              mentor_id
            )
          `
          )
          .eq("student_id", userId)
          .single();

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

        const project = projectData?.projects;
        if (!project) {
          if (isMounted) {
            setProject(null);
            setMentor(null);
            setError(null);
            setLoading(false);
          }
          return;
        }

        // Separately fetch mentor profile from profiles table
        // Note: Only query columns that exist (no expertise column)
        const { data: mentorData, error: mentorErr } = await supabase
          .from("profiles")
          .select("id, name, email")
          .eq("id", project.mentor_id)
          .single();

        if (mentorErr) {
          console.warn("Mentor fetch failed", mentorErr?.message);
          // Don't fail the whole request if mentor fetch fails
        }

        if (isMounted) {
          setProject(project);
          setMentor(mentorData || null);
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

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Hook to fetch tasks for the logged-in student
 * @param {string} userId - The authenticated user's ID
 * @returns {Object} - { tasks, stats, loading, error }
 */
export function useStudentTasks(userId) {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    todo: 0,
    progress: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchTasks = async () => {
      try {
        // Guard: Prevent API calls without valid user
        if (!userId) {
          console.warn("[useStudentTasks] No userId provided");
          setLoading(false);
          return;
        }

        const { data, error: err } = await supabase
          .from("tasks")
          .select("*")
          .eq("assigned_to", userId)
          .order("created_at", { ascending: false });

        if (err) {
          console.warn("Tasks fetch failed", err?.message);
          if (isMounted) {
            setError(err.message);
            setTasks([]);
            setStats({
              total: 0,
              completed: 0,
              inProgress: 0,
              todo: 0,
              progress: 0,
            });
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setTasks(data || []);

          // Calculate stats
          const total = data?.length || 0;
          const completed =
            data?.filter((t) => t.status === "Done").length || 0;
          const inProgress =
            data?.filter((t) => t.status === "In Progress").length || 0;
          const todo = data?.filter((t) => t.status === "To Do").length || 0;
          const progress =
            total > 0 ? Math.round((completed / total) * 100) : 0;

          setStats({
            total,
            completed,
            inProgress,
            todo,
            progress,
          });

          setError(null);
        }
      } catch (err) {
        console.error("[useStudentTasks] Error:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTasks();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { tasks, stats, loading, error };
}

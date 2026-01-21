import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, AlertCircle, Plus, Trash2 } from "lucide-react";
import { StudentDataContext } from "../../../context/StudentContext";

export default function TasksPage() {
  const { activeTasks, updateTaskStatus, addTask, deleteTask } =
    useContext(StudentDataContext);
  const [filter, setFilter] = useState("all");
  const [showAddTask, setShowAddTask] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  const filters = [
    { label: "All Tasks", value: "all" },
    { label: "To Do", value: "To Do" },
    { label: "In Progress", value: "In Progress" },
    { label: "Done", value: "Done" },
  ];

  const filteredTasks =
    filter === "all"
      ? activeTasks
      : activeTasks.filter((t) => t.status === filter);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-400 bg-red-400/10";
      case "Medium":
        return "text-yellow-400 bg-yellow-400/10";
      case "Low":
        return "text-green-400 bg-green-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  const getStatusIcon = (status) => {
    if (status === "Done")
      return <CheckCircle2 size={20} className="text-green-500" />;
    if (status === "In Progress")
      return <AlertCircle size={20} className="text-accent" />;
    return <Circle size={20} className="text-gray-400" />;
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      addTask({
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        dueDate: formData.dueDate,
        projectId: "PROJ001", // Active project
        assignee: { id: "STU001", name: "Alex Johnson" },
        status: "To Do",
        tags: [],
      });
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
      });
      setShowAddTask(false);
    }
  };

  const taskStats = [
    {
      label: "To Do",
      count: activeTasks.filter((t) => t.status === "To Do").length,
      color: "bg-gray-600",
    },
    {
      label: "In Progress",
      count: activeTasks.filter((t) => t.status === "In Progress").length,
      color: "bg-accent",
    },
    {
      label: "Done",
      count: activeTasks.filter((t) => t.status === "Done").length,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="min-h-screen p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Tasks</h1>
            <p className="text-gray-400">
              Manage your project tasks and deadlines.
            </p>
          </div>
          <motion.button
            onClick={() => setShowAddTask(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-purple text-dark font-semibold hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            Add Task
          </motion.button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="flex gap-4">
        {taskStats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-effect px-6 py-3 rounded-lg border border-white/10 flex items-center gap-3"
          >
            <div className={`w-3 h-3 rounded-full ${stat.color}`} />
            <div>
              <p className="text-xs text-gray-400">{stat.label}</p>
              <p className="text-lg font-bold">{stat.count}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <motion.button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === f.value
                ? "bg-accent text-dark font-semibold"
                : "glass-effect border border-white/10 hover:border-white/20 text-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {f.label}
          </motion.button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 mb-2">No tasks found</p>
              <p className="text-sm text-gray-500">
                Try adjusting your filters
              </p>
            </motion.div>
          ) : (
            filteredTasks.map((task, idx) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-effect p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all hover:bg-white/5"
              >
                <div className="flex items-start gap-4">
                  {/* Status Button */}
                  <motion.div
                    className="flex-shrink-0 pt-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => {
                        const nextStatus =
                          task.status === "To Do"
                            ? "In Progress"
                            : task.status === "In Progress"
                            ? "Done"
                            : "To Do";
                        updateTaskStatus(task.id, nextStatus);
                      }}
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {getStatusIcon(task.status)}
                    </button>
                  </motion.div>

                  {/* Task Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3
                          className={`font-semibold ${
                            task.status === "Done"
                              ? "line-through text-gray-500"
                              : ""
                          }`}
                        >
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {task.description}
                        </p>
                      </div>
                      <motion.button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 size={18} className="text-red-400" />
                      </motion.button>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                      {task.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-xs text-gray-500">
                        Due: {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddTask(false)}
          >
            <motion.form
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleAddTask}
              className="glass-effect p-8 rounded-xl border border-white/10 w-full max-w-md space-y-4"
            >
              <h2 className="text-2xl font-bold">Add New Task</h2>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Task title"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Task description"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent transition-colors"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <motion.button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-purple text-dark font-semibold hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Task
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setShowAddTask(false)}
                  className="flex-1 px-4 py-2 rounded-lg glass-effect border border-white/10 hover:border-white/20 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

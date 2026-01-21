import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  MessageSquare,
  Settings,
  Zap,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);

  const commands = [
    {
      id: "task-new",
      label: "Create New Task",
      category: "Tasks",
      description: "Create a new task for the project",
      icon: Zap,
      action: () => alert("Opening create task dialog..."),
    },
    {
      id: "meeting-schedule",
      label: "Schedule Meeting",
      category: "Meetings",
      description: "Schedule a meeting with team",
      icon: MessageSquare,
      action: () => alert("Opening meeting scheduler..."),
    },
    {
      id: "feedback-view",
      label: "View Mentor Feedback",
      category: "Feedback",
      description: "See latest mentor feedback",
      icon: MessageSquare,
      action: () => alert("Opening feedback view..."),
    },
    {
      id: "docs-open",
      label: "Open Documentation",
      category: "Resources",
      description: "Access project documentation",
      icon: FileText,
      action: () => alert("Opening documentation..."),
    },
    {
      id: "settings",
      label: "Preferences",
      category: "Settings",
      description: "Manage account settings",
      icon: Settings,
      action: () => alert("Opening settings..."),
    },
    {
      id: "export-report",
      label: "Export Progress Report",
      category: "Reports",
      description: "Download your progress report",
      icon: FileText,
      action: () => alert("Downloading report..."),
    },
    {
      id: "help",
      label: "Help & Support",
      category: "Help",
      description: "Get help and support",
      icon: MessageSquare,
      action: () => alert("Opening help center..."),
    },
    {
      id: "logout",
      label: "Logout",
      category: "Account",
      description: "Sign out of your account",
      icon: LogOut,
      action: () => alert("Logging out..."),
    },
  ];

  // Filter commands based on search
  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }

      if (isOpen) {
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            setSelectedIdx((prev) => (prev + 1) % filtered.length);
            break;
          case "ArrowUp":
            e.preventDefault();
            setSelectedIdx(
              (prev) => (prev - 1 + filtered.length) % filtered.length
            );
            break;
          case "Enter":
            e.preventDefault();
            if (filtered[selectedIdx]) {
              filtered[selectedIdx].action();
              setIsOpen(false);
            }
            break;
          case "Escape":
            e.preventDefault();
            setIsOpen(false);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIdx, filtered]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [filtered]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-40 px-4 py-2 rounded-full bg-gradient-to-r from-accent to-accent-purple text-white shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 text-sm font-medium"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Ctrl+K</span>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl"
          >
            <div className="glass-effect rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Search Input */}
              <div className="p-4 border-b border-white/10 flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search commands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsOpen(false)}
                  className="text-xs px-2 py-1 rounded bg-white/10 text-gray-400 hover:bg-white/20"
                >
                  ESC
                </motion.button>
              </div>

              {/* Commands List */}
              <div className="max-h-96 overflow-y-auto">
                {filtered.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 text-center"
                  >
                    <p className="text-gray-400">No commands found</p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="divide-y divide-white/10"
                  >
                    {/* Group by category */}
                    {Object.entries(
                      filtered.reduce((acc, cmd) => {
                        if (!acc[cmd.category]) acc[cmd.category] = [];
                        acc[cmd.category].push(cmd);
                        return acc;
                      }, {})
                    ).map(([category, cmds]) => (
                      <div key={category}>
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-white/5">
                          {category}
                        </div>
                        {cmds.map((cmd, idx) => {
                          const globalIdx = filtered.findIndex(
                            (c) => c.id === cmd.id
                          );
                          const Icon = cmd.icon;

                          return (
                            <motion.button
                              key={cmd.id}
                              onClick={() => {
                                cmd.action();
                                setIsOpen(false);
                              }}
                              whileHover={{ x: 4 }}
                              className={`w-full px-4 py-3 flex items-center gap-3 transition-colors text-left ${
                                globalIdx === selectedIdx
                                  ? "bg-accent/20 border-l-2 border-accent"
                                  : "hover:bg-white/5"
                              }`}
                              onMouseEnter={() => setSelectedIdx(globalIdx)}
                            >
                              <div className="w-5 h-5 text-gray-400">
                                <Icon className="w-5 h-5" />
                              </div>

                              <div className="flex-1">
                                <p className="text-sm font-medium text-white">
                                  {cmd.label}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {cmd.description}
                                </p>
                              </div>

                              {globalIdx === selectedIdx && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-gray-400"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-white/10 bg-white/5 flex items-center justify-between text-xs text-gray-400">
                <span>
                  Press{" "}
                  <kbd className="px-1 py-0.5 rounded bg-white/10">↑↓</kbd> to
                  navigate,{" "}
                  <kbd className="px-1 py-0.5 rounded bg-white/10">↵</kbd> to
                  select
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

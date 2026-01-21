import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export default function Toast({ message, type = "success" }) {
  const getIcon = () => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case "error":
        return "bg-red-500/20 border-red-500/50 text-red-300";
      case "info":
        return "bg-blue-500/20 border-blue-500/50 text-blue-300";
      default:
        return "bg-green-500/20 border-green-500/50 text-green-300";
    }
  };

  return (
    <motion.div
      className={`fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-md ${getColors()} z-50 max-w-sm`}
      initial={{ opacity: 0, y: 50, x: 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 50, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {getIcon()}
      <span className="text-sm font-medium flex-1">{message}</span>
    </motion.div>
  );
}

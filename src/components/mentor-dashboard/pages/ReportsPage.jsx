import React, { useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../../../context/DataContext";
import {
  Download,
  Eye,
  FileText,
  Calendar,
  Package,
  TrendingUp,
} from "lucide-react";
import MentorLayout from "../MentorLayout";

function ReportCard({ report, onDownload, onPreview }) {
  const typeIcons = {
    Progress: <TrendingUp className="w-5 h-5" />,
    Final: <CheckCircle className="w-5 h-5" />,
    Phase: <Package className="w-5 h-5" />,
  };

  const typeColors = {
    Progress: "text-blue-400",
    Final: "text-green-400",
    Phase: "text-purple-400",
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div
            className={`${typeColors[report.type]} p-3 rounded-lg bg-white/10`}
          >
            {typeIcons[report.type] || <FileText className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">{report.name}</h3>
            <span
              className={`inline-block text-xs font-semibold px-2 py-1 rounded ${
                typeColors[report.type]
              } bg-white/10`}
            >
              {report.type}
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-t border-white/10">
        <div>
          <p className="text-xs text-gray-500 mb-1">Generated</p>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <p className="text-sm font-medium">
              {new Date(report.generatedDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">File Size</p>
          <p className="text-sm font-medium">{report.fileSize}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white/5 rounded p-3 mb-4 max-h-24 overflow-y-auto">
        <p className="text-sm text-gray-300">{report.summary}</p>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
        <div className="w-2 h-2 bg-green-400 rounded-full" />
        <span className="text-xs text-green-300">{report.status}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <motion.button
          onClick={() => onPreview(report.id)}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Eye className="w-4 h-4" />
          Preview
        </motion.button>
        <motion.button
          onClick={() => onDownload(report.id)}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-4 h-4" />
          Download
        </motion.button>
      </div>
    </motion.div>
  );
}

function ReportPreviewModal({ report, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-dark border border-white/10 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-b from-dark/95 to-dark/80 border-b border-white/10 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{report.name}</h2>
          <motion.button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ✕
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Report Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-white/5 border border-white/10 rounded p-4">
              <p className="text-xs text-gray-500 mb-1">Report Type</p>
              <p className="text-lg font-semibold">{report.type}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded p-4">
              <p className="text-xs text-gray-500 mb-1">Generated</p>
              <p className="text-lg font-semibold">
                {new Date(report.generatedDate).toLocaleDateString()}
              </p>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded p-6"
          >
            <h3 className="text-lg font-semibold mb-3">Report Summary</h3>
            <p className="text-gray-300 leading-relaxed">{report.summary}</p>
          </motion.div>

          {/* Mock Report Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded p-6"
          >
            <h3 className="text-lg font-semibold mb-3">Key Metrics</h3>
            <div className="space-y-3">
              {["Completion Rate", "Team Performance", "Quality Score"].map(
                (metric, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-gray-400">{metric}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-white/10 rounded-full h-2">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-accent-purple rounded-full"
                          style={{ width: `${Math.random() * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold w-12">
                        {Math.floor(Math.random() * 100)}%
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Action */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full bg-gradient-to-r from-accent to-accent-purple hover:from-accent-purple hover:to-accent text-white font-semibold py-3 rounded-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Download Full Report
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ReportsPage() {
  const { reports, downloadReport } = useData();
  const [filterType, setFilterType] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports =
    filterType === "all"
      ? reports
      : reports.filter((r) => r.type === filterType);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const reportTypes = ["all", ...new Set(reports.map((r) => r.type))];

  return (
    <MentorLayout
      pageTitle="Project Reports"
      pageDescription="Access generated project reports and documentation"
    >
      {/* Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-400 text-sm">Total Reports</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">
            {reports.length}
          </p>
        </motion.div>
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-400 text-sm">Progress Reports</p>
          <p className="text-3xl font-bold text-green-400 mt-2">
            {reports.filter((r) => r.type === "Progress").length}
          </p>
        </motion.div>
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-400 text-sm">Available</p>
          <p className="text-3xl font-bold text-purple-400 mt-2">
            {reports.filter((r) => r.status === "Available").length}
          </p>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {reportTypes.map((type) => (
          <motion.button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterType === type
                ? "bg-accent text-dark"
                : "bg-white/10 hover:bg-white/20"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Reports Grid */}
      {filteredReports.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredReports.map((report) => (
            <motion.div key={report.id} variants={itemVariants}>
              <ReportCard
                report={report}
                onDownload={() => downloadReport(report.id)}
                onPreview={() => setSelectedReport(report)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-400 text-lg">No reports found</p>
        </motion.div>
      )}

      {/* Preview Modal */}
      {selectedReport && (
        <ReportPreviewModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </MentorLayout>
  );
}

// Missing import for CheckCircle - add to imports
const CheckCircle = ({ className }) => <div className={className}>📋</div>;

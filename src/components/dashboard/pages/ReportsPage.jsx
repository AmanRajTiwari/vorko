import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { StudentDataContext } from "../../../context/StudentContext";

export default function ReportsPage() {
  const { reports, activeProject, submitReport } =
    useContext(StudentDataContext);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: "",
    type: "Progress",
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle size={20} className="text-green-500" />;
      case "Pending":
        return <Clock size={20} className="text-yellow-400" />;
      case "Rejected":
        return <AlertCircle size={20} className="text-red-400" />;
      default:
        return <FileText size={20} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "from-green-500/20 to-emerald-600/20 border-green-500/30";
      case "Pending":
        return "from-yellow-500/20 to-orange-600/20 border-yellow-500/30";
      case "Rejected":
        return "from-red-500/20 to-red-600/20 border-red-500/30";
      default:
        return "from-gray-500/20 to-gray-600/20 border-gray-500/30";
    }
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (uploadData.title.trim()) {
      submitReport({
        projectId: activeProject.id,
        title: uploadData.title,
        type: uploadData.type,
        file: `${uploadData.title}.pdf`,
        sections: [],
      });
      setUploadData({ title: "", type: "Progress" });
      setShowUpload(false);
    }
  };

  return (
    <div className="min-h-screen p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Reports</h1>
            <p className="text-gray-400">
              Manage and submit your project reports.
            </p>
          </div>
          <motion.button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-purple text-dark font-semibold hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload size={20} />
            Submit Report
          </motion.button>
        </div>
      </motion.div>

      <div className="space-y-4">
        {reports.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 glass-effect p-8 rounded-xl border border-white/10"
          >
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-400 mb-2">No reports yet</p>
            <p className="text-sm text-gray-500">
              Submit your first report to get started
            </p>
          </motion.div>
        ) : (
          reports.map((report, idx) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedReport(report)}
              className={`glass-effect p-6 rounded-xl border cursor-pointer transition-all hover:border-white/30 bg-gradient-to-br ${getStatusColor(
                report.status
              )}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 rounded-lg bg-white/10">
                    <FileText size={24} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{report.title}</h3>
                      {getStatusIcon(report.status)}
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      {report.type} Report
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>Submitted: {report.submissionDate}</span>
                      <span>•</span>
                      <span className="font-semibold">{report.status}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} className="text-gray-400" />
                </motion.button>
              </div>

              {report.mentorFeedback && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <p className="text-xs text-gray-400 mb-2">Mentor Feedback</p>
                  <p className="text-sm text-gray-300">
                    {report.mentorFeedback}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Report Details Modal */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedReport(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect p-8 rounded-xl border border-white/10 w-full max-w-2xl max-h-96 overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedReport.title}
                  </h2>
                  <p className="text-gray-400">{selectedReport.type} Report</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedReport.status)}
                  <span className="font-semibold">{selectedReport.status}</span>
                </div>
              </div>

              <div className="space-y-4 pb-6 border-b border-white/10 mb-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Submitted Date</p>
                  <p className="text-gray-300">
                    {selectedReport.submissionDate}
                  </p>
                </div>

                {selectedReport.mentorFeedback && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">
                      Mentor Feedback
                    </p>
                    <p className="text-gray-300 p-3 bg-white/5 rounded-lg">
                      {selectedReport.mentorFeedback}
                    </p>
                  </div>
                )}
              </div>

              {selectedReport.sections.length > 0 && (
                <div className="space-y-4 mb-6">
                  <h3 className="font-bold">Report Sections</h3>
                  {selectedReport.sections.map((section, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 bg-white/5 rounded-lg"
                    >
                      <p className="font-semibold mb-2">{section.title}</p>
                      <p className="text-sm text-gray-400">{section.content}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              <motion.button
                onClick={() => setSelectedReport(null)}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-purple text-dark font-semibold hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Report Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUpload(false)}
          >
            <motion.form
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmitReport}
              className="glass-effect p-8 rounded-xl border border-white/10 w-full max-w-md space-y-4"
            >
              <h2 className="text-2xl font-bold">Submit Report</h2>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Report Title
                </label>
                <input
                  type="text"
                  value={uploadData.title}
                  onChange={(e) =>
                    setUploadData({ ...uploadData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
                  placeholder="e.g., Mid-Semester Progress"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Report Type
                </label>
                <select
                  value={uploadData.type}
                  onChange={(e) =>
                    setUploadData({ ...uploadData, type: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent transition-colors"
                >
                  <option>Progress</option>
                  <option>Final</option>
                  <option>Viva Preparation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  File (PDF)
                </label>
                <div className="p-4 border-2 border-dashed border-white/20 rounded-lg text-center hover:border-white/40 transition-colors cursor-pointer">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-400">
                    Click to upload or drag
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <motion.button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-purple text-dark font-semibold hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setShowUpload(false)}
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

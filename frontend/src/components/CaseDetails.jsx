import React from "react";
import { motion } from "framer-motion";

const CaseDetails = ({ caseData }) => {
  if (!caseData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-indigo-200 text-gray-700">
        <h2 className="text-3xl font-semibold mb-2">No Case Data Found</h2>
        <p className="text-lg text-gray-600">
          Please search with a valid CNR number.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex flex-col items-center justify-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/60 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl w-full max-w-2xl p-8"
      >
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-6">
          🏛️ Case Details
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Case Type</span>
            <span className="text-lg font-semibold">{caseData.caseType}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Case Number</span>
            <span className="text-lg font-semibold">{caseData.caseNumber}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">CNR Number</span>
            <span className="text-lg font-semibold">{caseData.cnrNumber}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Court</span>
            <span className="text-lg font-semibold">
              {caseData.court || "Not Specified"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Next Hearing</span>
            <span className="text-lg font-semibold">
              {new Date(caseData.nextHearingDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Status</span>
            <span
              className={`text-lg font-semibold ${
                caseData.status === "Closed"
                  ? "text-red-600"
                  : caseData.status === "Ongoing"
                  ? "text-green-600"
                  : "text-gray-700"
              }`}
            >
              {caseData.status || "Not Available"}
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-md transition-all transform hover:scale-105"
          >
            🔄 Search Another Case
          </button>
        </div>
      </motion.div>

      <footer className="mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Case Tracker Portal
      </footer>
    </div>
  );
};

export default CaseDetails;

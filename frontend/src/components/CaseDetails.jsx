import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const formatDate = (dateStr) => {
  if (!dateStr) return "Not Available";
  const date = new Date(dateStr);
  return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
};

const CaseDetails = () => {
  const caseData = useSelector((state) => state.case.caseData);
  // console.log("CaseData : " + caseData.caseType);
  const navigate = useNavigate();
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
        className="bg-white/70 backdrop-blur-lg border border-white/40 shadow-2xl rounded-3xl w-full max-w-3xl p-8"
      >
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
          🏛️ Case Details
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
          {/* Case Info */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Case Type</span>
            <span className="text-lg font-semibold">
              {caseData.caseType || "Not Available"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">
              CNR Number
            </span>
            <span className="text-lg font-semibold">
              {caseData.cnrNumber || "Not Available"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Court</span>
            <span className="text-lg font-semibold">
              {caseData.court || "Not Specified"}
            </span>
          </div>

          {/* Petitioner Details */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">
              Petitioner Name
            </span>
            <span className="text-lg font-semibold">
              {caseData.petitioner.name || "Not Available"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">
              Petitioner Address
            </span>
            <span className="text-lg font-semibold">
              {caseData.petitioner.address || "Not Available"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">
              Petitioner Contact
            </span>
            <span className="text-lg font-semibold">
              {caseData.petitioner.contact || "Not Available"}
            </span>
          </div>

          {/* Advocate Details */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">
              Advocate Name
            </span>
            <span className="text-lg font-semibold">
              {caseData.advocate.name || "Not Available"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">
              Bar Council Reg. No.
            </span>
            <span className="text-lg font-semibold">
              {caseData.advocate.barRegNo || "Not Available"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">
              Advocate Contact
            </span>
            <span className="text-lg font-semibold">
              {caseData.advocate.contact || "Not Available"}
            </span>
          </div>

          {/* Dates and Status */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">
              Filing Date
            </span>
            <span className="text-lg font-semibold">
              {formatDate(caseData.createdAt)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Title</span>
            <span className="text-lg font-semibold max-w-80">
              {caseData.shortCaseTitle}
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
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/dashboard/case-status");
            }}
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

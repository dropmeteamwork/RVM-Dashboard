import React, { useState } from "react";
import AnalyticsCard from "../components/AnalyticsCard";

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState("certifications");

  return (
    <div className="ml-56 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">✓ Compliance & Certifications</h1>
            <p className="text-gray-600">Monitor certifications and compliance status</p>
          </div>
          <button className="btn btn-primary">Add Certification</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("certifications")}
          className={`px-4 py-3 font-semibold border-b-2 transition ${
            activeTab === "certifications"
              ? "border-primary-color text-primary-color"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Certifications
        </button>
        <button
          onClick={() => setActiveTab("audit-history")}
          className={`px-4 py-3 font-semibold border-b-2 transition ${
            activeTab === "audit-history"
              ? "border-primary-color text-primary-color"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Audit History
        </button>
        <button
          onClick={() => setActiveTab("compliance-status")}
          className={`px-4 py-3 font-semibold border-b-2 transition ${
            activeTab === "compliance-status"
              ? "border-primary-color text-primary-color"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Compliance Status
        </button>
      </div>

      {/* Content */}
      {activeTab === "certifications" && (
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600 mb-4">Certifications and compliance data endpoint is being configured.</p>
            <p className="text-sm text-gray-500">
              This section will display all your ISO, environmental, and regulatory certifications once the backend is ready.
            </p>
          </div>
        </div>
      )}

      {activeTab === "audit-history" && (
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600 mb-4">Audit history and records endpoint is being configured.</p>
            <p className="text-sm text-gray-500">
              Review all past audits, findings, and corrective actions once the backend is ready.
            </p>
          </div>
        </div>
      )}

      {activeTab === "compliance-status" && (
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600 mb-4">Compliance status dashboard endpoint is being configured.</p>
            <p className="text-sm text-gray-500">
              Monitor regulatory requirements, deadlines, and compliance metrics once the backend is ready.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

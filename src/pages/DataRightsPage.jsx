import React, { useState } from "react";

export default function DataRightsPage() {
  const [activeTab, setActiveTab] = useState("dsar-requests");

  return (
    <div className="ml-56 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🔒 Data Subject Rights (GDPR)</h1>
            <p className="text-gray-600">Manage Data Subject Access Requests, erasure, and portability</p>
          </div>
          <button className="btn btn-primary">New Request</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("dsar-requests")}
          className={`px-4 py-3 font-semibold border-b-2 transition ${
            activeTab === "dsar-requests"
              ? "border-primary-color text-primary-color"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          DSAR Requests
        </button>
        <button
          onClick={() => setActiveTab("guidelines")}
          className={`px-4 py-3 font-semibold border-b-2 transition ${
            activeTab === "guidelines"
              ? "border-primary-color text-primary-color"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Guidelines
        </button>
      </div>

      {/* Content */}
      {activeTab === "dsar-requests" && (
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600 mb-4">DSAR requests endpoint is being configured.</p>
            <p className="text-sm text-gray-500">
              Track and manage data subject access requests, erasure requests, and data portability requests once the backend is ready.
            </p>
          </div>
        </div>
      )}

      {activeTab === "guidelines" && (
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600 mb-4">Guidelines endpoint is being configured.</p>
            <p className="text-sm text-gray-500">
              View GDPR compliance requirements, data retention policies, and contact information once the backend is ready.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

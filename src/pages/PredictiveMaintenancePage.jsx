import React, { useState } from "react";

export default function PredictiveMaintenancePage() {
  const [activeTab, setActiveTab] = useState("risk-assessment");

  return (
    <div className="ml-56 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">⚡ Predictive Maintenance (AI)</h1>
            <p className="text-gray-600">Machine health prediction and failure risk assessment</p>
          </div>
          <button className="btn btn-primary">View Alerts</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("risk-assessment")}
          className={`px-4 py-3 font-semibold border-b-2 transition ${
            activeTab === "risk-assessment"
              ? "border-primary-color text-primary-color"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Risk Assessment
        </button>
        <button
          onClick={() => setActiveTab("telemetry")}
          className={`px-4 py-3 font-semibold border-b-2 transition ${
            activeTab === "telemetry"
              ? "border-primary-color text-primary-color"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Telemetry
        </button>
        <button
          onClick={() => setActiveTab("failure-patterns")}
          className={`px-4 py-3 font-semibold border-b-2 transition ${
            activeTab === "failure-patterns"
              ? "border-primary-color text-primary-color"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Failure Patterns
        </button>
      </div>

      {/* Content */}
      {activeTab === "risk-assessment" && (
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600 mb-4">Risk assessment endpoint is being configured with AI models.</p>
            <p className="text-sm text-gray-500">
              View machine health scores, failure predictions, and recommended maintenance actions once the backend is ready.
            </p>
          </div>
        </div>
      )}

      {activeTab === "telemetry" && (
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600 mb-4">Telemetry data endpoint is being configured.</p>
            <p className="text-sm text-gray-500">
              Monitor real-time machine metrics (temperature, vibration, pressure) once the backend is ready.
            </p>
          </div>
        </div>
      )}

      {activeTab === "failure-patterns" && (
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600 mb-4">Failure patterns analysis endpoint is being configured.</p>
            <p className="text-sm text-gray-500">
              Analyze historical failures and identify patterns once the backend is ready.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

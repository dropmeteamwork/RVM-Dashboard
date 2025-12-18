import React, { useState } from "react";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("section-reports");

  return (
    <div className="ml-56 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">Generate comprehensive reports for individual sections or the entire dashboard</p>
          </div>
          <button className="btn btn-primary">Generate Report</button>
        </div>
      </div>

      {/* Generate New Report Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 border border-blue-200">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Generate New Report</h2>
            <p className="text-gray-600">Create a comprehensive report with multiple sections or export individual section data</p>
          </div>
          <button className="btn btn-sm btn-primary">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
            </svg>
            Generate Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("section-reports")}
          className={`px-4 py-3 font-semibold border-b-2 transition ${
            activeTab === "section-reports"
              ? "border-primary-color text-primary-color"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Section Reports
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`px-4 py-3 font-semibold border-b-2 transition ${
            activeTab === "templates"
              ? "border-primary-color text-primary-color"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Report Templates
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-3 font-semibold border-b-2 transition ${
            activeTab === "history"
              ? "border-primary-color text-primary-color"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Report History
        </button>
      </div>

      {/* Content */}
      {activeTab === "section-reports" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dashboard Overview */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">Dashboard Overview</h3>
                <p className="text-sm text-gray-600">Generate a detailed report for this section</p>
              </div>
            </div>
            <button className="w-full btn btn-outline btn-sm">Generate Report</button>
          </div>

          {/* Environment & Sustainability */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">Environment & Sustainability</h3>
                <p className="text-sm text-gray-600">Generate a detailed report for this section</p>
              </div>
            </div>
            <button className="w-full btn btn-outline btn-sm">Generate Report</button>
          </div>

          {/* User Management */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">User Management</h3>
                <p className="text-sm text-gray-600">Generate a detailed report for this section</p>
              </div>
            </div>
            <button className="w-full btn btn-outline btn-sm">Generate Report</button>
          </div>

          {/* Machine Fleet */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 7H7v6h6V7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">Machine Fleet</h3>
                <p className="text-sm text-gray-600">Generate a detailed report for this section</p>
              </div>
            </div>
            <button className="w-full btn btn-outline btn-sm">Generate Report</button>
          </div>

          {/* B2B Analytics */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">B2B Analytics</h3>
                <p className="text-sm text-gray-600">Generate a detailed report for this section</p>
              </div>
            </div>
            <button className="w-full btn btn-outline btn-sm">Generate Report</button>
          </div>

          {/* Compliance & Certifications */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">Compliance & Certifications</h3>
                <p className="text-sm text-gray-600">Generate a detailed report for this section</p>
              </div>
            </div>
            <button className="w-full btn btn-outline btn-sm">Generate Report</button>
          </div>
        </div>
      )}

      {activeTab === "templates" && (
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600 mb-4">Report templates endpoint is being configured.</p>
            <p className="text-sm text-gray-500">
              Access pre-built report templates for quick generation once the backend is ready.
            </p>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600 mb-4">Report history endpoint is being configured.</p>
            <p className="text-sm text-gray-500">
              View all previously generated reports and download them again once the backend is ready.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

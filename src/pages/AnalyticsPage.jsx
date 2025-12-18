import React, { useEffect, useState } from "react";
import AnalyticsCard from "../components/AnalyticsCard";
import AiSystemMetricsCard from "../components/AiSystemMetricsCard";
import { getAnalyticsData } from "../services/api";
import UserEngagementChart from "../components/Charts/UserEngagementChart";
import RecyclingTrendsChart from "../components/Charts/RecyclingTrendsChart";
import MaterialDistributionChart from "../components/Charts/MaterialDistributionChart";

export default function AnalyticsPage({ className }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [months, setMonths] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnalyticsData(months);
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            err.message ||
            "A network or server error occurred."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [months]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <p className="text-lg font-medium">Error: {error} </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📈 Analytics & Insights</h1>
          <p className="text-gray-600 mt-1">B2B Partner Analytics & Performance Metrics</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            📊 Export Partners CSV
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            📊 Export Trends CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-4 px-6 font-medium text-center transition ${
              activeTab === "overview"
                ? "text-gray-900 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("partners")}
            className={`flex-1 py-4 px-6 font-medium text-center transition ${
              activeTab === "partners"
                ? "text-gray-900 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Partners
          </button>
          <button
            onClick={() => setActiveTab("trends")}
            className={`flex-1 py-4 px-6 font-medium text-center transition ${
              activeTab === "trends"
                ? "text-gray-900 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Trends
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Material Composition */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Material Composition</h3>
                {data && data.Recycling_Trends_section ? (
                  <MaterialDistributionChart
                    material_distribution_data={{
                      bottles_percentage: 45.5,
                      cans_percentage: 54.5
                    }}
                  />
                ) : (
                  <p className="text-gray-500">No data available</p>
                )}
              </div>

              {/* Recovery Rate */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recovery Rate by Partner</h3>
                <div className="flex items-center justify-center h-64">
                  <div className="w-full">
                    <div className="flex justify-between items-end gap-4">
                      {[
                        { name: 'Partner A', rate: 36 },
                        { name: 'Partner B', rate: 28 },
                        { name: 'Partner C', rate: 22 },
                        { name: 'Partner D', rate: 14 }
                      ].map((partner, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center">
                          <div className="w-full bg-blue-600 rounded" style={{ height: `${partner.rate * 6}px` }}></div>
                          <span className="text-xs font-medium text-gray-600 mt-2">{partner.name}</span>
                          <span className="text-xs text-gray-500">{partner.rate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive Analytics */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Key Performance Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-600 text-sm font-medium mb-2">Daily Active Users</p>
                  <h4 className="text-3xl font-bold text-blue-600">
                    {data?.Comprehensive_Analytics_section?.daily_active_users || 0}
                  </h4>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-gray-600 text-sm font-medium mb-2">Avg Session Duration</p>
                  <h4 className="text-3xl font-bold text-green-600">
                    {data?.Comprehensive_Analytics_section?.avg_session_duration || 0}min
                  </h4>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-gray-600 text-sm font-medium mb-2">Avg Points Per User</p>
                  <h4 className="text-3xl font-bold text-purple-600">
                    {data?.Comprehensive_Analytics_section?.avg_points_per_user || 0}
                  </h4>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-gray-600 text-sm font-medium mb-2">Engagement Score</p>
                  <h4 className="text-3xl font-bold text-orange-600">
                    {data?.Comprehensive_Analytics_section?.engagement_score || 0}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Partners Tab */}
        {activeTab === "partners" && (
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Partner Network Performance</h3>
            <div className="space-y-4">
              {[
                { name: 'Global Recycling Solutions', recovery: 36, status: 'Active' },
                { name: 'EcoProcess Technologies', recovery: 28, status: 'Active' },
                { name: 'GreenCycle Partners', recovery: 22, status: 'Active' },
                { name: 'Sustainable Materials Ltd', recovery: 14, status: 'Pending' }
              ].map((partner, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-900">{partner.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">Recovery Rate: {partner.recovery}%</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    partner.status === 'Active' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {partner.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trends Tab */}
        {activeTab === "trends" && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recycling Trends */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recycling Trends</h3>
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => setMonths(6)}
                    className={`px-3 py-1 cursor-pointer rounded ${
                      months === 6 ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    Last 6 Months
                  </button>
                  <button
                    onClick={() => setMonths(12)}
                    className={`px-3 py-1 cursor-pointer rounded ${
                      months === 12 ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    Last 12 Months
                  </button>
                </div>
                {data && data.Recycling_Trends_section ? (
                  <RecyclingTrendsChart
                    recyclingData={data.Recycling_Trends_section}
                  />
                ) : (
                  <p>No data available</p>
                )}
              </div>

              {/* User Engagement Trends */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">User Engagement Trends</h3>
                {data && data.UserEngagement_Trends_section ? (
                  <UserEngagementChart
                    engagementData={data.UserEngagement_Trends_section}
                  />
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

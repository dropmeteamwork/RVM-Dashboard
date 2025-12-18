import React, { useEffect, useState } from "react";
import StatusCard from "../components/StatusCard";
import AnalyticsCard from "../components/AnalyticsCard";
import { getEnvironmentalMetrics } from "../services/api";
import EnvironmentalImpactChart from "../components/Charts/EnvironmentalImpactChart";

export default function EnvironmentPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("material-flow");
  const [months, setMonths] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEnvironmentalMetrics(months);
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
          <h1 className="text-3xl font-bold text-gray-900">Environment & Sustainability</h1>
          <p className="text-gray-600 mt-1">CSRD (ESRS E5) Compliance Reporting</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          ↓ Export CSRD Report
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-600 text-sm font-medium">Total Material Inflow (kg)</p>
            <span className="text-2xl">📥</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">8,300</h3>
          <p className="text-gray-500 text-xs mt-2">kg</p>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-600 text-sm font-medium">Material Outflow (kg)</p>
            <span className="text-2xl">📤</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">6,350</h3>
          <p className="text-gray-500 text-xs mt-2">kg</p>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-600 text-sm font-medium">Recycling Rate</p>
            <span className="text-2xl">♻️</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">94.2%</h3>
          <p className="text-gray-500 text-xs mt-2">%</p>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-600 text-sm font-medium">Carbon Offset (kg CO₂)</p>
            <span className="text-2xl">🌍</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">2,145</h3>
          <p className="text-gray-500 text-xs mt-2">kg</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("material-flow")}
            className={`flex-1 py-4 px-6 font-medium text-center transition ${
              activeTab === "material-flow"
                ? "text-gray-900 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Material Flow
          </button>
          <button
            onClick={() => setActiveTab("recycler-partners")}
            className={`flex-1 py-4 px-6 font-medium text-center transition ${
              activeTab === "recycler-partners"
                ? "text-gray-900 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Recycler Partners
          </button>
          <button
            onClick={() => setActiveTab("product-passport")}
            className={`flex-1 py-4 px-6 font-medium text-center transition ${
              activeTab === "product-passport"
                ? "text-gray-900 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Digital Product Passport
          </button>
        </div>

        {/* Material Flow Tab */}
        {activeTab === "material-flow" && (
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Material Inflow/Outflow Tracking</h3>
            {data.monthly_env_impact ? (
              <EnvironmentalImpactChart
                monthly_env_impact={data.monthly_env_impact}
              />
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
        )}

        {/* Recycler Partners Tab */}
        {activeTab === "recycler-partners" && (
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Partner Network</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Active Partners</h4>
                <p className="text-3xl font-bold text-blue-600">24</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Total Processing Capacity</h4>
                <p className="text-3xl font-bold text-green-600">15.2T/month</p>
              </div>
            </div>
          </div>
        )}

        {/* Digital Product Passport Tab */}
        {activeTab === "product-passport" && (
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Digital Product Passport</h3>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-600">Digital Product Passport tracking coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


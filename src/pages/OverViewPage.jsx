import React, { useEffect, useState } from "react";
import StatusCard from "../components/StatusCard";
import MetricsCard from "../components/MetricsCard";
import AnalyticsCard from "../components/AnalyticsCard";
import AlertCard from "../components/AlertCard";
import { getOverviewMetrics } from "../services/api";
import NetworkPerformanceChart from "../components/Charts/NetworkPerformanceChart";
import MaterialDistributionChart from "../components/Charts/MaterialDistributionChart";

export default function OverViewPage() {
  const icons = [
    {
      pathD:
        "M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z",
      iconColor: "#7bab43",
    },
    {
      pathD:
        "M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z",
      iconColor: "#FF6411",
    },
    {
      pathD:
        "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
      iconColor: "#0065A3",
    },
    {
      pathD:
        "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z",
      iconColor: "#FFB020",
    },
  ];

  const [data, setData] = useState(null);
  const [months, setMonths] = useState(6); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getOverviewMetrics(months);
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
    <div className="">
      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Real-time insights into your RVM network operations</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm font-medium mb-3">Total Machines</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">1,247</h3>
          <div className="flex items-center text-green-600 text-sm">
            <span className="text-green-600 mr-1">↑</span>
            <span className="font-medium">+12%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm font-medium mb-3">Active RVMs</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">1,089</h3>
          <div className="flex items-center text-green-600 text-sm">
            <span className="text-green-600 mr-1">↑</span>
            <span className="font-medium">+8%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm font-medium mb-3">Total Transactions</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">45,892</h3>
          <div className="flex items-center text-red-600 text-sm">
            <span className="text-red-600 mr-1">↓</span>
            <span className="font-medium">-3%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm font-medium mb-3">Material Collected</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">12.5T</h3>
          <div className="flex items-center text-green-600 text-sm">
            <span className="text-green-600 mr-1">↑</span>
            <span className="font-medium">+24%</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Transaction Trends */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Transaction Trends</h3>
          {data && data.Network_Performance_section ? (
            <NetworkPerformanceChart
              performanceData={data.Network_Performance_section}
            />
          ) : (
            <p className="text-gray-500">Loading chart data...</p>
          )}
        </div>

        {/* Material Mix */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Material Mix</h3>
          {data && data.Material_Distribution_section ? (
            <MaterialDistributionChart
              material_distribution_data={data.Material_Distribution_section}
            />
          ) : (
            <p className="text-gray-500">Loading chart data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { getUserAnalytics } from "../services/api";
import UserDemographicsSummary from "../components/Charts/UserDemographicsSummary";
import UserGenderDistributionChart from "../components/Charts/UserGenderDistributionChart";
import UserAgeDistributionChart from "../components/Charts/UserAgeDistributionChart";
import UserRetentionChart from "../components/Charts/UserRetentionChart";

export default function UserAnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserAnalytics();
        console.log('Full API Response:', response.data);
        console.log('Gender Distribution:', response.data?.gender_distribution);
        console.log('User Retention Data:', response.data?.user_retention_data);
        setData(response.data);
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
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <p className="text-lg font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">User Analytics</h1>
        <p className="text-gray-600 mt-1">Demographics, retention, and user insights</p>
      </div>

      {/* Demographics Summary Cards */}
      <div className="mb-8">
        {data && <UserDemographicsSummary data={data} />}
      </div>

      {/* Charts Section - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gender Distribution */}
        {data?.gender_distribution && (
          <UserGenderDistributionChart genderData={data.gender_distribution} />
        )}

        {/* Age Distribution */}
        {data?.user_details && (
          <UserAgeDistributionChart users={data.user_details} />
        )}
      </div>

      {/* User Retention Chart - Full Width */}
      {data?.user_retention_data && (
        <UserRetentionChart user_retension_data={data.user_retention_data} />
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import AnalyticsCard from "../components/AnalyticsCard";
import UserCard from "../components/UserCard";
import { getUserAnalytics } from "../services/api";
import UserRetentionChart from "../components/Charts/UserRetentionChart";

export default function UserPage({ className }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserAnalytics();
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
  }, []);

  useEffect(() => {
    if (data) {
      const filtered = data.user_details.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, data]);

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
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage users and consent preferences</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2">
          + Add User
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("users")}
            className={`flex-1 py-4 px-6 font-medium text-center transition ${
              activeTab === "users"
                ? "text-gray-900 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("consent")}
            className={`flex-1 py-4 px-6 font-medium text-center transition ${
              activeTab === "consent"
                ? "text-gray-900 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Consent Management
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="p-6">
            <div className="flex mb-6">
              <input
                type="search"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Join Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="py-4 px-4 text-gray-900">{user.email}</td>
                        <td className="py-4 px-4 text-gray-900">{user.username}</td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                            User
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded text-sm font-medium ${
                            user.active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}>
                            {user.active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{user.joined}</td>
                        <td className="py-4 px-4 flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 transition">✏️</button>
                          <button className="text-red-600 hover:text-red-800 transition">🗑️</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Consent Management Tab */}
        {activeTab === "consent" && (
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Consent Management</h3>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Marketing Communications</h4>
                  <p className="text-sm text-gray-600">Users who have opted in</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">{filteredUsers.filter(u => u.active).length}</p>
                  <p className="text-sm text-gray-500">Active</p>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Data Processing</h4>
                  <p className="text-sm text-gray-600">Users who have consented</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{filteredUsers.length}</p>
                  <p className="text-sm text-gray-500">Consented</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

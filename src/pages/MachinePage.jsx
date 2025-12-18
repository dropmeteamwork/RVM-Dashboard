import React, { useEffect, useState } from "react";
import MachineCard from "../components/MachineCard";
import { getMachineMetrics } from "../services/api";
import MachineCapacityGauge from "../components/Charts/MachineCapacityGauge";
import MachineHealthOverview from "../components/Charts/MachineHealthOverview";
import MachineCollectionPerformance from "../components/Charts/MachineCollectionPerformance";

export default function MachinePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("machines");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMachines, setFilteredMachines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMachineMetrics();
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
      const filtered = data.filter((machine) =>
        machine.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMachines(filtered);
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
          <h1 className="text-3xl font-bold text-gray-900">Machine Management</h1>
          <p className="text-gray-600 mt-1">Monitor RVM fleet health and performance</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          Add Machine
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("machines")}
            className={`flex-1 py-4 px-6 font-medium text-center transition ${
              activeTab === "machines"
                ? "text-gray-900 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Machines
          </button>
          <button
            onClick={() => setActiveTab("maintenance")}
            className={`flex-1 py-4 px-6 font-medium text-center transition ${
              activeTab === "maintenance"
                ? "text-gray-900 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Maintenance Logs
          </button>
        </div>

        {/* Machines Tab */}
        {activeTab === "machines" && (
          <div className="p-6">
            {/* Charts Section */}
            <div className="mb-8 space-y-6">
              {/* Machine Health Overview */}
              {data && data.length > 0 && (
                <MachineHealthOverview machines={data} />
              )}

              {/* Collection Performance */}
              {data && data.length > 0 && (
                <MachineCollectionPerformance machines={data} />
              )}

              {/* Individual Capacity Gauges */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {data && data.length > 0 && data.map((machine, idx) => (
                  <MachineCapacityGauge
                    key={idx}
                    machineName={machine.name}
                    cansCapacity={machine.cans_capacity}
                    bottlesCapacity={machine.bottles_capacity}
                  />
                ))}
              </div>
            </div>

            {/* Machines Table */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">All Machines</h3>
            </div>
            
            <div className="flex mb-6">
              <input
                type="search"
                placeholder="Search machines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Machines Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Machine ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Health</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Transactions</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Service</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMachines.length > 0 ? (
                    filteredMachines.map((machine, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="py-4 px-4 text-gray-900 font-medium">RVM-{String(index + 1).padStart(3, '0')}</td>
                        <td className="py-4 px-4 text-gray-900">{machine.name}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded text-sm font-medium ${
                            machine.status === "Active" || machine.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {machine.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500 transition"
                                style={{ width: `${Math.min(machine.efficiency, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                              {Math.round(machine.efficiency)}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-900">{machine.total_collected}</td>
                        <td className="py-4 px-4 text-gray-600">2024-11-10</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-500">
                        No machines found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Maintenance Logs Tab */}
        {activeTab === "maintenance" && (
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Maintenance Logs</h3>
            <div className="space-y-4">
              {filteredMachines.slice(0, 3).map((machine, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{machine.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">Last service: 2024-11-10</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      View Log
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

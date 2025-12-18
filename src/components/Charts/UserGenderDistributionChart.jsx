import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const UserGenderDistributionChart = ({ genderData }) => {
  // The API returns: { "male_percentage": "1.7%", "female_percentage": "0.1%" }
  const malePercentage = typeof genderData?.male_percentage === 'string' 
    ? parseFloat(genderData.male_percentage) 
    : genderData?.male_percentage || 0;
  
  const femalePercentage = typeof genderData?.female_percentage === 'string' 
    ? parseFloat(genderData.female_percentage) 
    : genderData?.female_percentage || 0;

  // Prepare data for pie chart
  const data = [
    {
      name: 'Male',
      value: malePercentage,
      percentage: `${malePercentage.toFixed(2)}%`
    },
    {
      name: 'Female',
      value: femalePercentage,
      percentage: `${femalePercentage.toFixed(2)}%`
    }
  ];

  // Filter out zero values for cleaner chart
  const chartData = data.filter(item => item.value > 0);

  const COLORS = ['#3b82f6', '#ec4899'];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Gender Distribution</h3>
      
      <div className="w-full h-80">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                formatter={(value) => `${value.toFixed(2)}%`}
              />
              <Legend />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.percentage}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No gender data available</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">{item.name}</p>
            <p className="text-2xl font-bold text-gray-900">{item.percentage}</p>
            <p className="text-xs text-gray-500 mt-1">{item.value.toFixed(2)}% of users</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGenderDistributionChart;

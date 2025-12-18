import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const UserGenderDistributionChart = ({ genderData }) => {
  // Debug: Log the actual data structure
  console.log('Gender Data received:', genderData);
  console.log('Gender Data type:', typeof genderData);
  console.log('Gender Data keys:', genderData ? Object.keys(genderData) : 'null');

  // Parse gender data - check all possible variations
  let malePercentage = 0;
  let femalePercentage = 0;

  if (genderData) {
    // Try different possible keys
    if (genderData.male !== undefined) {
      malePercentage = typeof genderData.male === 'string' 
        ? parseFloat(genderData.male) 
        : genderData.male;
    }
    
    if (genderData.female !== undefined) {
      femalePercentage = typeof genderData.female === 'string' 
        ? parseFloat(genderData.female) 
        : genderData.female;
    }
  }

  console.log('Parsed Male:', malePercentage);
  console.log('Parsed Female:', femalePercentage);

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
            <p>No gender data available (Male: {malePercentage}, Female: {femalePercentage})</p>
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

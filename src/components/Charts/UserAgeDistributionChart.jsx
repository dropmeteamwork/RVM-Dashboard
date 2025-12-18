import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserAgeDistributionChart = ({ users }) => {
  // Create age buckets
  const ageBuckets = {
    '18-25': 0,
    '26-35': 0,
    '36-45': 0,
    '46-55': 0,
    '56-65': 0,
    '65+': 0
  };

  // Count users in each age bucket
  if (users) {
    users.forEach(user => {
      if (user.age) {
        const age = parseInt(user.age);
        if (age >= 18 && age <= 25) ageBuckets['18-25']++;
        else if (age >= 26 && age <= 35) ageBuckets['26-35']++;
        else if (age >= 36 && age <= 45) ageBuckets['36-45']++;
        else if (age >= 46 && age <= 55) ageBuckets['46-55']++;
        else if (age >= 56 && age <= 65) ageBuckets['56-65']++;
        else if (age > 65) ageBuckets['65+']++;
      }
    });
  }

  // Convert to chart data
  const chartData = Object.entries(ageBuckets).map(([range, count]) => ({
    range,
    count,
    percentage: users && users.length > 0 ? ((count / users.length) * 100).toFixed(1) : 0
  }));

  const hasData = chartData.some(item => item.count > 0);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Age Distribution</h3>
      
      {hasData ? (
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} />
              <YAxis label={{ value: 'Number of Users', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                formatter={(value) => value}
                labelFormatter={(label) => `Age ${label}`}
              />
              <Legend />
              <Bar dataKey="count" fill="#8b5cf6" name="User Count" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex items-center justify-center h-80 text-gray-500">
          <p>No age data available</p>
        </div>
      )}

      {/* Age Range Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {chartData.map((item, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
            <p className="text-xs font-semibold text-gray-700 mb-1">{item.range}</p>
            <p className="text-lg font-bold text-purple-600">{item.count}</p>
            <p className="text-xs text-gray-500">{item.percentage}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAgeDistributionChart;

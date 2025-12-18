import React from 'react';

const UserDemographicsSummary = ({ data }) => {
  // Extract user statistics from the data
  const userCount = data?.user_details?.length || 0;
  
  // Calculate demographic stats
  let totalAge = 0;
  let usersWithAge = 0;
  let activeUsers = 0;

  if (data?.user_details) {
    data.user_details.forEach(user => {
      if (user.active) activeUsers++;
      if (user.age) {
        totalAge += parseInt(user.age);
        usersWithAge++;
      }
    });
  }

  const avgAge = usersWithAge > 0 ? (totalAge / usersWithAge).toFixed(1) : 'N/A';
  const activePercentage = userCount > 0 ? ((activeUsers / userCount) * 100).toFixed(1) : '0';

  // Parse gender distribution
  const genderData = data?.gender_distribution || {};
  const malePercentage = typeof genderData.male === 'string' ? parseFloat(genderData.male) : 0;
  const femalePercentage = typeof genderData.female === 'string' ? parseFloat(genderData.female) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Users Card */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
        <p className="text-gray-700 text-sm font-medium mb-2">Total Users</p>
        <h3 className="text-3xl font-bold text-blue-600 mb-2">{userCount}</h3>
        <p className="text-xs text-gray-600">Registered users</p>
      </div>

      {/* Active Users Card */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
        <p className="text-gray-700 text-sm font-medium mb-2">Active Users</p>
        <h3 className="text-3xl font-bold text-green-600 mb-2">{activeUsers}</h3>
        <p className="text-xs text-gray-600">{activePercentage}% active</p>
      </div>

      {/* Average Age Card */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
        <p className="text-gray-700 text-sm font-medium mb-2">Average Age</p>
        <h3 className="text-3xl font-bold text-purple-600 mb-2">{avgAge}</h3>
        <p className="text-xs text-gray-600">years old</p>
      </div>

      {/* Gender Distribution Card */}
      <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6 border border-pink-200">
        <p className="text-gray-700 text-sm font-medium mb-2">Gender Diversity</p>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-700">Male</span>
            <span className="text-sm font-bold text-pink-600">{malePercentage.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-700">Female</span>
            <span className="text-sm font-bold text-pink-600">{femalePercentage.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDemographicsSummary;

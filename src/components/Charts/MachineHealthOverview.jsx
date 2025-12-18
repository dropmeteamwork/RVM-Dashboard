import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MachineHealthOverview = ({ machines }) => {
  // Prepare data from machines
  const data = machines.map(machine => {
    const totalCapacity = (parseFloat(machine.cans_capacity) + parseFloat(machine.bottles_capacity)) / 2;
    const healthScore = 100 - Math.min(100, totalCapacity);
    
    return {
      name: machine.name.split(',')[0].substring(0, 15), // Shorten name for display
      health: parseFloat(healthScore.toFixed(1)),
      efficiency: parseFloat(machine.efficiency) || 0,
      collected: machine.total_collected,
      fullName: machine.name
    };
  });

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Machine Health & Efficiency</h3>
      
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
              formatter={(value) => `${value}%`}
              labelFormatter={(label) => `Machine: ${label}`}
            />
            <Legend />
            <Bar dataKey="health" fill="#22c55e" name="Health Score" radius={[8, 8, 0, 0]} />
            <Bar dataKey="efficiency" fill="#3b82f6" name="Efficiency" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((machine, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">{machine.fullName}</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Health</p>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${machine.health}%` }}
                  ></div>
                </div>
                <p className="text-xs font-bold text-gray-900 mt-1">{machine.health.toFixed(1)}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Items</p>
                <p className="text-lg font-bold text-blue-600">{machine.collected}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachineHealthOverview;

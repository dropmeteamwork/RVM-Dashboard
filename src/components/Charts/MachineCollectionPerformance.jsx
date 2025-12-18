import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const MachineCollectionPerformance = ({ machines }) => {
  // Prepare data - X axis: daily average, Y axis: total collected
  const data = machines.map((machine, idx) => ({
    x: parseFloat(machine.daily_average) || 0,
    y: machine.total_collected,
    name: machine.name.split(',')[0],
    efficiency: parseFloat(machine.efficiency) || 0,
    index: idx
  }));

  // Color based on efficiency
  const getColor = (efficiency) => {
    if (efficiency >= 80) return '#22c55e'; // Green
    if (efficiency >= 60) return '#3b82f6'; // Blue
    if (efficiency >= 40) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const colors = data.map(item => getColor(item.efficiency));

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Collection Performance Analysis</h3>
      
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Daily Avg" 
              label={{ value: 'Daily Average Items', position: 'insideBottomRight', offset: -5 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Total Collected" 
              label={{ value: 'Total Items Collected', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
              content={({ payload }) => {
                if (payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-3 bg-white border border-gray-300 rounded-lg">
                      <p className="font-semibold text-gray-900">{data.name}</p>
                      <p className="text-sm text-gray-600">Daily Avg: {data.x.toFixed(1)} items</p>
                      <p className="text-sm text-gray-600">Total: {data.y} items</p>
                      <p className="text-sm text-gray-600">Efficiency: {data.efficiency.toFixed(1)}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter name="Machines" data={data} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Insights */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-sm font-semibold text-gray-900 mb-3">Performance Insights</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((machine, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: colors[idx] }}
              ></div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-700">{machine.name}</p>
                <p className="text-xs text-gray-600">
                  {machine.y} items | {machine.x.toFixed(1)}/day avg
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MachineCollectionPerformance;

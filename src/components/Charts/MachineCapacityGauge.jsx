import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const MachineCapacityGauge = ({ machineName, cansCapacity, bottlesCapacity }) => {
  // Parse capacity percentages
  const cansPct = parseFloat(cansCapacity) || 0;
  const bottlesPct = parseFloat(bottlesCapacity) || 0;

  // Determine color based on capacity
  const getCapacityColor = (capacity) => {
    if (capacity >= 80) return '#ef4444'; // Red - critical
    if (capacity >= 60) return '#f97316'; // Orange - warning
    if (capacity >= 40) return '#eab308'; // Yellow - caution
    return '#22c55e'; // Green - good
  };

  const cansColor = getCapacityColor(cansPct);
  const bottlesColor = getCapacityColor(bottlesPct);

  const getCapacityStatus = (capacity) => {
    if (capacity >= 100) return 'FULL';
    if (capacity >= 80) return 'CRITICAL';
    if (capacity >= 60) return 'WARNING';
    if (capacity >= 40) return 'CAUTION';
    return 'GOOD';
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{machineName}</h3>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Cans Capacity */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Background circle */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="15" />
              
              {/* Progress circle */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={cansColor}
                strokeWidth="15"
                strokeDasharray={`${(cansPct / 100) * 565.48} 565.48`}
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
              
              {/* Center text */}
              <text x="100" y="95" textAnchor="middle" fontSize="28" fontWeight="bold" fill={cansColor}>
                {cansPct.toFixed(1)}%
              </text>
              <text x="100" y="115" textAnchor="middle" fontSize="12" fill="#666">
                Cans
              </text>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700 mb-1">Status</p>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              getCapacityStatus(cansPct) === 'GOOD' ? 'bg-green-100 text-green-700' :
              getCapacityStatus(cansPct) === 'CAUTION' ? 'bg-yellow-100 text-yellow-700' :
              getCapacityStatus(cansPct) === 'WARNING' ? 'bg-orange-100 text-orange-700' :
              'bg-red-100 text-red-700'
            }`}>
              {getCapacityStatus(cansPct)}
            </span>
          </div>
        </div>

        {/* Bottles Capacity */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Background circle */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="15" />
              
              {/* Progress circle */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={bottlesColor}
                strokeWidth="15"
                strokeDasharray={`${(bottlesPct / 100) * 565.48} 565.48`}
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
              
              {/* Center text */}
              <text x="100" y="95" textAnchor="middle" fontSize="28" fontWeight="bold" fill={bottlesColor}>
                {bottlesPct.toFixed(1)}%
              </text>
              <text x="100" y="115" textAnchor="middle" fontSize="12" fill="#666">
                Bottles
              </text>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700 mb-1">Status</p>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              getCapacityStatus(bottlesPct) === 'GOOD' ? 'bg-green-100 text-green-700' :
              getCapacityStatus(bottlesPct) === 'CAUTION' ? 'bg-yellow-100 text-yellow-700' :
              getCapacityStatus(bottlesPct) === 'WARNING' ? 'bg-orange-100 text-orange-700' :
              'bg-red-100 text-red-700'
            }`}>
              {getCapacityStatus(bottlesPct)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineCapacityGauge;

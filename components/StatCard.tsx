
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change }) => {
  const isPositive = change.startsWith('+');
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
  
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between hover:bg-gray-700/50 transition-colors duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-400">{title}</h3>
        <div className="text-indigo-400">{icon}</div>
      </div>
      <div>
        <p className="text-3xl font-bold text-white mt-2">{value}</p>
        <p className={`text-sm mt-1 ${changeColor}`}>{change}</p>
      </div>
    </div>
  );
};

export default StatCard;

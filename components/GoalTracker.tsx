
import React from 'react';

interface GoalTrackerProps {
  currentAmount: number;
  goalAmount: number;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({ currentAmount, goalAmount }) => {
  const progress = Math.min((currentAmount / goalAmount) * 100, 100);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-2xl font-bold text-white">${currentAmount.toLocaleString()}</span>
          <span className="text-gray-400"> raised of ${goalAmount.toLocaleString()}</span>
        </div>
        <span className="text-lg font-semibold text-indigo-400">{progress.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default GoalTracker;

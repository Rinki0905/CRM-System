import React, { type JSX } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
  change: string;
  changeColor: string;
  iconBgColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, change, changeColor, iconBgColor }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${iconBgColor}`}>
          {icon}
        </div>
      </div>
      <p className={`mt-4 text-sm ${changeColor}`}>{change}</p>
    </div>
  );
};

export default StatsCard;
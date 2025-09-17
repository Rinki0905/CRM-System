import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <div className="flex items-center space-x-4">
        <input type="search" placeholder="Search customers, deals..." className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700">+ Add New</button>
      </div>
    </div>
  );
};

export default PageHeader;
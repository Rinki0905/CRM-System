import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  onMenuButtonClick: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, onMenuButtonClick }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      
      <div className="flex items-center">
        <button onClick={onMenuButtonClick} className="md:hidden p-2 mr-2 text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500">{subtitle}</p>
        </div>
      </div>
      
      {title === 'Dashboard' && (
        <div className="flex items-center space-x-4 mt-4 md:mt-0 w-full md:w-auto">
        </div>
      )}
    </div>
  );
};

export default PageHeader;
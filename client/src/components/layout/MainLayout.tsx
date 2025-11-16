import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Chatbot from '../common/Chatbot';
import PageHeader from './PageHeader';
import { useState } from 'react'; 
const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    if (!path || path === 'dashboard') return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };
  
  const getPageSubtitle = () => {
      return "Manage your CRM efficiently and effectively.";
  }

  return (
    <div className="flex h-screen bg-gray-50 relative">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto md:ml-64 p-6">
          <PageHeader 
            title={getPageTitle()}
            subtitle={getPageSubtitle()}
            onMenuButtonClick={() => setSidebarOpen(true)}
          />
          <Outlet /> 
        </main>
      </div>

      <Chatbot />
    </div>
  );
};

export default MainLayout;
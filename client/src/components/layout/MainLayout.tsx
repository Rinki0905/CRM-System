import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Chatbot from '../common/Chatbot';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      {/* This 'main' element is the key to scrolling */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <Outlet /> 
      </main>
      <Chatbot />
    </div>
  );
};

export default MainLayout;
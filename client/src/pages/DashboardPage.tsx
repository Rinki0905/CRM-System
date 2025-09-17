import  { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import PageHeader from '../components/layout/PageHeader';
import StatsCard from '../components/dashboard/StatsCard';
import SalesPerformanceChart from '../components/dashboard/SalesPerformanceChart';

const CustomerIcon = () => <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>;
const DealIcon = () => <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l5.618-5.618A12.02 12.02 0 0012 16.5a12.02 12.02 0 005.618-1.583l-5.618-5.62z" /></svg>;
const RevenueIcon = () => <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>;
const ConversionIcon = () => <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;

const DashboardPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const [stats, setStats] = useState({ totalCustomers: 0, activeDeals: 0, totalRevenue: 0, conversionRate: 0 });
  const [recentCustomers, setRecentCustomers] = useState<any[]>([]);
  const [upcomingTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const config = { headers: { Authorization: `Bearer ${user?.token}` } };
        const [statsRes, customersRes, ] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/dashboard/stats`, config),
          axios.get(`${import.meta.env.VITE_API_URL}/customers/recent`, config),
       //   axios.get(`${import.meta.env.VITE_API_URL}/tasks/upcoming`, config),
        ]);
        setStats(statsRes.data);
        setRecentCustomers(customersRes.data);
       // setUpcomingTasks(tasksRes.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchDashboardData();
  }, [user?.token, location]);

  if (loading) {
    return (
      <>
        <PageHeader title="Dashboard" subtitle="Welcome back! Here's what's happening today." />
        <div>Loading dashboard data...</div>
      </>
    );
  }

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Welcome back! Here's what's happening today." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Customers" value={stats.totalCustomers} icon={<CustomerIcon />} change="+12% from last month" changeColor="text-green-500" iconBgColor="bg-blue-100" />
        <StatsCard title="Active Deals" value={stats.activeDeals} icon={<DealIcon />} change="+8% from last week" changeColor="text-green-500" iconBgColor="bg-green-100" />
        <StatsCard title="Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon={<RevenueIcon />} change="+23% from last quarter" changeColor="text-green-500" iconBgColor="bg-yellow-100" />
        <StatsCard title="Conversion Rate" value={`${stats.conversionRate}%`} icon={<ConversionIcon />} change="+5.4% from last month" changeColor="text-green-500" iconBgColor="bg-purple-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-8">
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Customers</h2>
            <div>
              <button className="text-sm text-gray-600 px-3 py-1 border rounded-md mr-2 hover:bg-gray-100">Filter</button>
              <button className="text-sm text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700">+ Add Customer</button>
            </div>
          </div>
          <div>
            {recentCustomers.length > 0 ? (
              <ul className="space-y-3">
                {recentCustomers.map(c => (
                  <li key={c._id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                    <div className="flex items-center space-x-3"><img className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${c.name.replace(' ', '+')}`} alt={c.name} /><div><p className="font-medium text-sm text-gray-800">{c.name}</p><p className="text-xs text-gray-500">{c.email}</p></div></div><p className="text-sm text-gray-600">{c.company}</p><span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">Active</span></li>
                ))}
              </ul>
            ) : (<p className="text-center text-gray-400 py-8">No recent customers.</p>)}
          </div>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
           <div className="flex justify-between items-center mb-4"><h2 className="text-lg font-semibold text-gray-800">Upcoming Tasks</h2><a href="#" className="text-sm text-blue-600 hover:underline">View All</a></div>
           {upcomingTasks.length > 0 ? (
              <ul className="space-y-3">
                {upcomingTasks.map(t => (<li key={t._id} className="p-3 rounded-md border"><p className="font-semibold text-sm text-gray-800">{t.title}</p><p className="text-xs text-gray-500 mt-1">Due: {new Date(t.dueDate).toLocaleDateString()}</p></li>))}
              </ul>
            ) : (<p className="text-center text-gray-400 py-8">No upcoming tasks.</p>)}
           <button className="w-full text-sm mt-4 text-blue-600 border-2 border-dashed border-gray-300 rounded-md py-2 hover:bg-gray-100">+ Add New Task</button>
        </div>
      </div>
      
      <div className="mt-8">
        <SalesPerformanceChart />
      </div>
    </div>
  );
};

export default DashboardPage;
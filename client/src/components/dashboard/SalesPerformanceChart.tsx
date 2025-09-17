import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesPerformanceChart = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [chartData, setChartData] = useState<{ labels: string[], data: number[] } | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user?.token}` } };
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/analytics/sales`, config);
        setChartData(response.data);
      } catch (error) {
        console.error('Failed to fetch sales data', error);
      }
    };
    if (user?.token) fetchChartData();
  }, [user?.token]);

  const data = {
    labels: chartData?.labels || [],
    datasets: [
      {
        label: 'Sales Revenue',
        data: chartData?.data || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Performance</h2>
      {chartData ? <Line options={options} data={data} /> : <div className="text-center text-gray-400 py-16">Loading chart data...</div>}
    </div>
  );
};

export default SalesPerformanceChart;
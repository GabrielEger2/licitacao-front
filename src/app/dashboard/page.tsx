'use client'

import { motion } from "framer-motion";
import { FaSearch, FaChartLine, FaMoneyBillWave, FaStore } from 'react-icons/fa';
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
import SideBar from "@/components/SideBar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const stats = [
    { title: "Total Searches", value: "12,430", icon: FaSearch, change: "+12.3%" },
    { title: "Best Deal Found", value: "$299", icon: FaMoneyBillWave, change: "-24.5%" },
    { title: "Stores Tracked", value: "48", icon: FaStore, change: "+3 new" },
    { title: "Avg. Savings", value: "27%", icon: FaChartLine, change: "+8.2%" },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Price Trends',
        data: [650, 590, 800, 810, 560, 550],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const recentSearches = [
    { product: "PlayStation 5", store: "Amazon", price: "$499", status: "Deal" },
    { product: "MacBook Pro M2", store: "Best Buy", price: "$1899", status: "Alert" },
    { product: "Samsung OLED TV", store: "Walmart", price: "$1399", status: "Tracked" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />
      <div className="ml-72 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Deal Dashboard</h1>
            <span className="text-indigo-600 dark:text-indigo-400">Today: {new Date().toLocaleDateString()}</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                    <span className="text-indigo-600 dark:text-indigo-400 text-sm">{stat.change}</span>
                  </div>
                  <stat.icon className="w-12 h-12 text-indigo-600 dark:text-indigo-400 p-3 bg-indigo-50 dark:bg-gray-700 rounded-lg" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Price Trends Analysis</h2>
            <div className="h-96">
              <Line 
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'top', labels: { color: '#6b7280' } },
                  },
                  scales: {
                    x: { 
                      grid: { color: '#e5e7eb' },
                      ticks: { color: '#6b7280' }
                    },
                    y: { 
                      grid: { color: '#e5e7eb' },
                      ticks: { color: '#6b7280' }
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Recent Searches */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Searches</h2>
            <div className="space-y-4">
              {recentSearches.map((search, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{search.product}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{search.store}</p>
                  </div>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">{search.price}</span>
                  <span className="ml-4 px-3 py-1 bg-indigo-100 dark:bg-gray-600 text-indigo-600 dark:text-indigo-300 rounded-full text-sm">
                    {search.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
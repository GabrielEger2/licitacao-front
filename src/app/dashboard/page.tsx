'use client'

import PageLayout from '@/components/layout/PageLayout'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { motion } from 'framer-motion'
import { Bar, Line } from 'react-chartjs-2'
import {
  FaChartLine,
  FaMoneyBillWave,
  FaSearch,
  FaStore,
  FaUser,
} from 'react-icons/fa'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

export default function Dashboard() {
  const stats = [
    {
      title: 'Itens Pesquisados',
      value: '1,230',
      icon: FaSearch,
      change: '+12.3%',
    },
    {
      title: 'Preço Médio',
      value: 'R$290.00',
      icon: FaMoneyBillWave,
      change: '-24.5%',
    },
    {
      title: 'Empresas Pesquisadas',
      value: '3',
      icon: FaStore,
      change: '+3 novas',
    },
    { title: 'Pesquisas', value: '16', icon: FaChartLine, change: '+8.2%' },
  ]

  const chartData = {
    labels: ['Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'],
    datasets: [
      {
        label: 'Preço Médio',
        data: [350, 400, 200, 230, 280, 290],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
      },
      {
        label: 'Preço Mínimo',
        data: [300, 320, 180, 220, 210, 240],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
      },
      {
        label: 'Preço Máximo',
        data: [500, 450, 250, 240, 400, 320],
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
      },
    ],
  }

  const searchTrendData = {
    labels: ['Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'],
    datasets: [
      {
        label: 'Total Searches',
        data: [34399, 25098, 21030, 24305, 19602, 23001],
        backgroundColor: '#4f46e5',
        borderRadius: 8,
      },
    ],
  }

  const userActivityData = {
    labels: ['João', 'Paulo', 'Silvio', 'Ruan', 'Maria'],
    datasets: [
      {
        label: 'Pesquisas',
        data: [430, 390, 285, 240, 210],
        backgroundColor: '#818cf8',
        borderColor: '#4f46e5',
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  }

  const recentSearches = [
    {
      product: 'PlayStation 5',
      store: 'Kabum',
      price: 'R$3500',
      status: 'Excelente',
    },
    {
      product: 'MacBook Pro M2',
      store: 'Pauta',
      price: 'R$12999',
      status: 'Bom',
    },
    {
      product: 'iPhone 13 Pro',
      store: 'Apple Store',
      price: 'R$7999',
      status: 'Ruim',
    },
    {
      product: 'Samsung Galaxy S21',
      store: 'Magazine Luiza',
      price: 'R$3999',
      status: 'Excelente',
    },
    {
      product: 'Xiaomi Redmi Note 10',
      store: 'Amazon',
      price: 'R$1499',
      status: 'Bom',
    },
  ]

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 cursor-pointer">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                  <span className="text-indigo-600 dark:text-indigo-400 text-sm">
                    {stat.change}
                  </span>
                </div>
                <stat.icon className="w-12 h-12 text-indigo-600 dark:text-indigo-400 p-3 bg-indigo-50 dark:bg-gray-700 rounded-lg" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Price Trends Analysis
          </h2>
          <div className="h-96 w-[99%]">
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
                    ticks: { color: '#6b7280' },
                  },
                  y: {
                    grid: { color: '#e5e7eb' },
                    ticks: { color: '#6b7280' },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              <FaChartLine className="inline mr-2 text-indigo-600" />
              Pesquisas Mensais
            </h2>
            <div className="h-80">
              <Bar
                data={searchTrendData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      ticks: { color: '#6b7280' },
                    },
                    y: {
                      grid: { color: '#e5e7eb' },
                      ticks: { color: '#6b7280' },
                    },
                  },
                }}
              />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              <FaUser className="inline mr-2 text-indigo-600" />
              Pesquisas por Usuários
            </h2>
            <div className="h-80">
              <Bar
                data={userActivityData}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      ticks: { color: '#6b7280' },
                    },
                    y: {
                      grid: { display: false },
                      ticks: { color: '#6b7280' },
                    },
                  },
                }}
              />
            </div>
          </motion.div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Itens Recentemente Selecionados
          </h2>
          <div className="space-y-4">
            {recentSearches.map((search, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 10 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {search.product}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {search.store}
                  </p>
                </div>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  {search.price}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </PageLayout>
  )
}

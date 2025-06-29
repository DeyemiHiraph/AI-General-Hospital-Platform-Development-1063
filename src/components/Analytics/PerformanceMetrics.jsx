import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiServer, FiClock, FiUsers, FiCpu } = FiIcons;

const PerformanceMetrics = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg medical-card p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const performanceCards = [
    {
      title: 'System Uptime',
      value: `${data?.systemUptime || 0}%`,
      icon: FiServer,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Avg Load Time',
      value: `${data?.avgLoadTime || 0}s`,
      icon: FiClock,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Concurrent Users',
      value: data?.concurrentUsers?.toLocaleString() || '0',
      icon: FiUsers,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'API Response',
      value: `${data?.apiResponseTime || 0}ms`,
      icon: FiCpu,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Performance Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        {performanceCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg medical-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center`}>
                <SafeIcon icon={card.icon} className="text-white text-xl" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{card.value}</h3>
            <p className="text-gray-600 text-sm">{card.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Peak Hours Chart */}
        <div className="bg-white rounded-xl shadow-lg medical-card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Peak Usage Hours</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.peakHours || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Resource Usage */}
        <div className="bg-white rounded-xl shadow-lg medical-card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Resource Usage</h3>
          <div className="space-y-4">
            {Object.entries(data?.resourceUsage || {}).map(([resource, usage]) => (
              <div key={resource}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{resource}</span>
                  <span>{usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      usage > 80 ? 'bg-red-500' : usage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${usage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceMetrics;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import useAnalyticsStore from '../../store/analyticsStore';
import * as FiIcons from 'react-icons/fi';

const { FiActivity, FiUsers, FiClock, FiTrendingUp, FiServer, FiZap } = FiIcons;

const RealTimeMetrics = () => {
  const { analyticsData, updateRealTimeMetrics } = useAnalyticsStore();
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    let interval;
    if (isLive) {
      interval = setInterval(() => {
        updateRealTimeMetrics();
      }, 5000); // Update every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isLive, updateRealTimeMetrics]);

  const metrics = analyticsData?.realTimeMetrics || {};

  const metricCards = [
    {
      title: 'Active Consultations',
      value: metrics.activeConsultations || 0,
      icon: FiActivity,
      color: 'from-medical-500 to-medical-600',
      change: '+2 from last update',
      trend: 'up'
    },
    {
      title: 'Waiting Patients',
      value: metrics.waitingPatients || 0,
      icon: FiClock,
      color: 'from-orange-500 to-orange-600',
      change: `Avg wait: ${metrics.avgWaitTime || 0}min`,
      trend: 'neutral'
    },
    {
      title: 'Online Specialists',
      value: metrics.onlineSpecialists || 0,
      icon: FiUsers,
      color: 'from-green-500 to-green-600',
      change: 'All systems operational',
      trend: 'up'
    },
    {
      title: 'System Load',
      value: `${metrics.systemLoad || 0}%`,
      icon: FiServer,
      color: 'from-blue-500 to-blue-600',
      change: 'Optimal performance',
      trend: 'neutral'
    },
    {
      title: 'Today\'s Consultations',
      value: metrics.todayConsultations || 0,
      icon: FiTrendingUp,
      color: 'from-purple-500 to-purple-600',
      change: '+15% vs yesterday',
      trend: 'up'
    },
    {
      title: 'AI Response Rate',
      value: '<30s',
      icon: FiZap,
      color: 'from-yellow-500 to-yellow-600',
      change: 'Lightning fast',
      trend: 'up'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg medical-card p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-gray-800">Real-Time System Metrics</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isLive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600">{isLive ? 'Live' : 'Paused'}</span>
          </div>
        </div>
        
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isLive 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isLive ? 'Pause Updates' : 'Resume Updates'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metricCards.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                <SafeIcon icon={metric.icon} className="text-white text-sm" />
              </div>
              {isLive && (
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              )}
            </div>
            
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {metric.value}
            </div>
            
            <div className="text-xs text-gray-600 mb-2">
              {metric.title}
            </div>
            
            <div className={`text-xs font-medium ${
              metric.trend === 'up' ? 'text-green-600' : 
              metric.trend === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {metric.change}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-medical-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiActivity} className="text-medical-600" />
            <span className="text-sm font-medium text-medical-800">System Health Status</span>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            All Systems Operational
          </span>
        </div>
        <div className="mt-2 text-sm text-medical-700">
          Last updated: {new Date().toLocaleTimeString()} • Next update in {isLive ? '5' : '--'} seconds
        </div>
      </div>
    </motion.div>
  );
};

export default RealTimeMetrics;
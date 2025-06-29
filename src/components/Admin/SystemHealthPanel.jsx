import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import SafeIcon from '../../common/SafeIcon';
import useAdminStore from '../../store/adminStore';
import * as FiIcons from 'react-icons/fi';

const { FiServer, FiActivity, FiCpu, FiHardDrive, FiWifi, FiAlertTriangle } = FiIcons;

const SystemHealthPanel = () => {
  const { systemHealth, updateSystemHealth } = useAdminStore();
  const [healthHistory, setHealthHistory] = useState([]);

  useEffect(() => {
    // Update system health every 10 seconds
    const interval = setInterval(() => {
      const newHealth = updateSystemHealth();
      setHealthHistory(prev => {
        const updated = [...prev, {
          time: new Date().toLocaleTimeString(),
          cpu: newHealth.serverLoad,
          memory: Math.floor(Math.random() * 30) + 60,
          network: Math.floor(Math.random() * 20) + 70
        }];
        return updated.slice(-20); // Keep last 20 entries
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [updateSystemHealth]);

  const healthMetrics = [
    {
      title: 'Server Load',
      value: `${systemHealth.serverLoad}%`,
      icon: FiServer,
      color: 'from-blue-500 to-blue-600',
      status: systemHealth.serverLoad < 70 ? 'healthy' : systemHealth.serverLoad < 85 ? 'warning' : 'critical'
    },
    {
      title: 'API Usage',
      value: systemHealth.apiUsage?.toLocaleString() || '0',
      icon: FiActivity,
      color: 'from-green-500 to-green-600',
      status: 'healthy'
    },
    {
      title: 'Active Users',
      value: systemHealth.activeUsers?.toLocaleString() || '0',
      icon: FiWifi,
      color: 'from-purple-500 to-purple-600',
      status: 'healthy'
    },
    {
      title: 'AI Usage',
      value: systemHealth.aiUsage?.toLocaleString() || '0',
      icon: FiCpu,
      color: 'from-orange-500 to-orange-600',
      status: 'healthy'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">System Health</h2>
        <p className="text-gray-400">Real-time monitoring of system performance and health</p>
      </div>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                <SafeIcon icon={metric.icon} className="text-white text-xl" />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getStatusBg(metric.status)}`}></div>
                <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
                  {metric.status}
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
            <p className="text-gray-400 text-sm">{metric.title}</p>
          </motion.div>
        ))}
      </div>

      {/* System Uptime */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">System Uptime</h3>
          <span className="text-2xl font-bold text-green-400">{systemHealth.uptime?.toFixed(2)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${systemHealth.uptime}%` }}
          ></div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Real-time Performance */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6">Real-time Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={healthHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="cpu" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="CPU %"
              />
              <Line 
                type="monotone" 
                dataKey="memory" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Memory %"
              />
              <Line 
                type="monotone" 
                dataKey="network" 
                stroke="#F59E0B" 
                strokeWidth={2}
                name="Network %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Resource Utilization */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6">Resource Utilization</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">CPU Usage</span>
                <span className="text-white font-medium">{systemHealth.serverLoad}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${systemHealth.serverLoad}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Memory Usage</span>
                <span className="text-white font-medium">68%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-[68%] transition-all duration-300"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Disk Usage</span>
                <span className="text-white font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full w-[45%] transition-all duration-300"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Network I/O</span>
                <span className="text-white font-medium">23%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full w-[23%] transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <SafeIcon icon={FiAlertTriangle} className="text-yellow-400 text-xl" />
          <h3 className="text-xl font-semibold text-white">System Alerts</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-500/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-400 font-medium">All systems operational</span>
            </div>
            <span className="text-xs text-gray-400">2 minutes ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-900/20 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-400 font-medium">High API usage detected</span>
            </div>
            <span className="text-xs text-gray-400">15 minutes ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-400 font-medium">Database backup completed</span>
            </div>
            <span className="text-xs text-gray-400">1 hour ago</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemHealthPanel;
import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {Navigate, useNavigate} from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import useAdminStore from '../../store/adminStore';
import useAnalyticsEngagementStore from '../../store/analyticsEngagementStore';
import * as FiIcons from 'react-icons/fi';

const {FiUsers, FiActivity, FiShield, FiMessageSquare, FiTrendingUp, FiServer, FiFileText, FiSettings, FiLogOut} = FiIcons;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const {adminUser, systemHealth, updateSystemHealth, isAdminAuthenticated, adminLogout} = useAdminStore();
  const {getEngagementAnalytics, predictPerformance} = useAnalyticsEngagementStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [engagementData, setEngagementData] = useState(null);

  // Redirect if not authenticated
  if (!isAdminAuthenticated) {
    return <Navigate to="/poweradmin" replace />;
  }

  useEffect(() => {
    // Update system health every 30 seconds
    const healthInterval = setInterval(() => {
      updateSystemHealth();
    }, 30000);

    // Get engagement analytics
    const analytics = getEngagementAnalytics();
    setEngagementData(analytics);

    // Generate performance predictions
    predictPerformance();

    return () => clearInterval(healthInterval);
  }, [updateSystemHealth, getEngagementAnalytics, predictPerformance]);

  const handleLogout = () => {
    adminLogout();
    navigate('/poweradmin');
  };

  const adminTabs = [
    {id: 'overview', label: 'Overview', icon: FiActivity},
    {id: 'users', label: 'User Management', icon: FiUsers},
    {id: 'content', label: 'Content Management', icon: FiFileText},
    {id: 'system', label: 'System Health', icon: FiServer},
    {id: 'helpdesk', label: 'AI Help Desk', icon: FiMessageSquare},
    {id: 'settings', label: 'Settings', icon: FiSettings}
  ];

  const overviewCards = [
    {
      title: 'Total Users',
      value: engagementData?.totalSessions || 1247,
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      title: 'Active Sessions',
      value: engagementData?.activeSessions || 89,
      icon: FiActivity,
      color: 'from-green-500 to-green-600',
      change: 'Live'
    },
    {
      title: 'System Uptime',
      value: `${systemHealth.uptime?.toFixed(1) || 99.8}%`,
      icon: FiServer,
      color: 'from-purple-500 to-purple-600',
      change: 'Stable'
    },
    {
      title: 'AI Usage',
      value: systemHealth.aiUsage || 1247,
      icon: FiShield,
      color: 'from-orange-500 to-orange-600',
      change: '+8%'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiShield} className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">MediVerse AI Admin Panel</h1>
              <p className="text-gray-400">Welcome back, {adminUser?.name || 'Admin'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">System Online</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Role: {adminUser?.role || 'admin'}</p>
              <p className="text-xs text-gray-500">Last login: {new Date().toLocaleTimeString()}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiLogOut} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mt-6">
          {adminTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <SafeIcon icon={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="space-y-8"
          >
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: index * 0.1}}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center`}>
                      <SafeIcon icon={card.icon} className="text-white text-xl" />
                    </div>
                    <span className="text-sm text-green-400 font-medium">{card.change}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{card.value}</h3>
                  <p className="text-gray-400 text-sm">{card.title}</p>
                </motion.div>
              ))}
            </div>

            {/* System Status */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-6">System Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">API Response Time</span>
                    <span className="text-green-400 font-medium">&lt; 200ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Database Performance</span>
                    <span className="text-green-400 font-medium">Optimal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">AI Model Status</span>
                    <span className="text-green-400 font-medium">All Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Security Status</span>
                    <span className="text-green-400 font-medium">Protected</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiUsers} className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="text-white text-sm">New user registration</p>
                      <p className="text-gray-400 text-xs">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiActivity} className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="text-white text-sm">System health check completed</p>
                      <p className="text-gray-400 text-xs">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiMessageSquare} className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="text-white text-sm">AI consultation completed</p>
                      <p className="text-gray-400 text-xs">8 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other tabs content */}
        {activeTab !== 'overview' && (
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-6">{adminTabs.find(tab => tab.id === activeTab)?.label}</h2>
            <p className="text-gray-400">This section is under development. Coming soon...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
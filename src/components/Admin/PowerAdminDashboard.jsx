import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import useAdminStore from '../../store/adminStore';
import usePowerAdminStore from '../../store/powerAdminStore';
import AIAnalyticsPanel from './AIAnalyticsPanel';
import AIConversationPanel from './AIConversationPanel';
import ReportsGenerator from './ReportsGenerator';
import PredictiveAnalytics from './PredictiveAnalytics';
import DocumentAnalyzer from './DocumentAnalyzer';
import CollaborationHub from './CollaborationHub';
import APIGenerator from './APIGenerator';
import SecurityCenter from './SecurityCenter';
import SEOOptimizationPanel from './SEOOptimizationPanel';
// Import the moved components
import AITrainerDashboard from '../Analytics/AITrainerDashboard';
import PerformanceMetrics from '../Analytics/PerformanceMetrics';
import PredictiveAnalyticsAdvanced from '../Analytics/PredictiveAnalytics';
import * as FiIcons from 'react-icons/fi';

const {
  FiBarChart3, FiMessageSquare, FiFileText, FiTrendingUp, FiUpload, FiUsers, 
  FiCode, FiShield, FiSettings, FiLogOut, FiActivity, FiBrain, FiZap, FiEye, 
  FiDownload, FiCpu, FiServer, FiSearch
} = FiIcons;

const PowerAdminDashboard = () => {
  const navigate = useNavigate();
  const { adminUser, isAdminAuthenticated, adminLogout } = useAdminStore();
  const { 
    initializePowerAdmin, dashboards, analyticsData, aiInsights, 
    systemMetrics, loading 
  } = usePowerAdminStore();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);

  // Redirect if not authenticated
  if (!isAdminAuthenticated) {
    return <Navigate to="/poweradmin" replace />;
  }

  useEffect(() => {
    initializePowerAdmin();
  }, [initializePowerAdmin]);

  const handleLogout = () => {
    adminLogout();
    navigate('/poweradmin');
  };

  const adminTabs = [
    { id: 'overview', label: 'AI Dashboard', icon: FiBarChart3 },
    { id: 'chat', label: 'Ask AI Anything', icon: FiMessageSquare },
    { id: 'reports', label: 'AI Reports', icon: FiFileText },
    { id: 'predictive', label: 'Predictive ML', icon: FiTrendingUp },
    { id: 'documents', label: 'Document AI', icon: FiUpload },
    { id: 'collaboration', label: 'Team Hub', icon: FiUsers },
    { id: 'api', label: 'API Generator', icon: FiCode },
    { id: 'seo', label: 'AI SEO Optimization', icon: FiSearch },
    { id: 'security', label: 'Security Center', icon: FiShield },
    // New tabs for moved components
    { id: 'ai-trainer', label: 'AI Model Trainer', icon: FiBrain },
    { id: 'performance', label: 'System Performance', icon: FiServer },
    { id: 'advanced-predictive', label: 'Advanced ML Analytics', icon: FiCpu }
  ];

  const overviewMetrics = [
    {
      title: 'Total Patients',
      value: systemMetrics?.totalPatients || '12,847',
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'AI Consultations',
      value: systemMetrics?.aiConsultations || '8,934',
      icon: FiBrain,
      color: 'from-green-500 to-green-600',
      change: '+18%',
      trend: 'up'
    },
    {
      title: 'Prediction Accuracy',
      value: systemMetrics?.predictionAccuracy || '94.7%',
      icon: FiTrendingUp,
      color: 'from-purple-500 to-purple-600',
      change: '+2.1%',
      trend: 'up'
    },
    {
      title: 'System Performance',
      value: systemMetrics?.systemPerformance || '99.8%',
      icon: FiZap,
      color: 'from-orange-500 to-orange-600',
      change: 'Optimal',
      trend: 'neutral'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                      <SafeIcon icon={metric.icon} className="text-white text-xl" />
                    </div>
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-400' : 
                      metric.trend === 'down' ? 'text-red-400' : 
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {metric.title}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* AI Analytics Panel */}
            <AIAnalyticsPanel darkMode={darkMode} />
          </motion.div>
        );

      case 'chat':
        return <AIConversationPanel darkMode={darkMode} />;

      case 'reports':
        return <ReportsGenerator darkMode={darkMode} />;

      case 'predictive':
        return <PredictiveAnalytics darkMode={darkMode} />;

      case 'documents':
        return <DocumentAnalyzer darkMode={darkMode} />;

      case 'collaboration':
        return <CollaborationHub darkMode={darkMode} />;

      case 'api':
        return <APIGenerator darkMode={darkMode} />;

      case 'seo':
        return <SEOOptimizationPanel darkMode={darkMode} />;

      case 'security':
        return <SecurityCenter darkMode={darkMode} />;

      // New moved components
      case 'ai-trainer':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiBrain} className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">AI Model Training Center</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Advanced machine learning system for medical AI specialists
                  </p>
                </div>
              </div>
            </div>
            <AITrainerDashboard />
          </motion.div>
        );

      case 'performance':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiServer} className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">System Performance Analytics</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Real-time system monitoring and performance metrics
                  </p>
                </div>
              </div>
            </div>
            <PerformanceMetrics data={analyticsData?.performanceMetrics} loading={loading} />
          </motion.div>
        );

      case 'advanced-predictive':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiCpu} className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Advanced Predictive Analytics</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    AI-powered health predictions and risk assessment for patients
                  </p>
                </div>
              </div>
            </div>
            <PredictiveAnalyticsAdvanced 
              patientData={{
                id: 'admin_view',
                age: 45,
                gender: 'aggregate',
                conditions: ['various'],
                medications: ['various'],
                lastVisit: new Date().toISOString()
              }}
              department="all"
            />
          </motion.div>
        );

      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}
          >
            <h2 className="text-2xl font-bold mb-6">
              {adminTabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              This section is under development. Coming soon...
            </p>
          </motion.div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiActivity} className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Power Admin Dashboard</h1>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                AI-Powered Analytics & Control Center
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={darkMode ? FiEye : FiEye} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                AI Systems Online
              </span>
            </div>
            <div className="text-right">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {adminUser?.name || 'Power Admin'}
              </p>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Last login: {new Date().toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <SafeIcon icon={FiLogOut} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mt-6 overflow-x-auto">
          {adminTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white'
                  : darkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
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
        {renderTabContent()}
      </div>
    </div>
  );
};

export default PowerAdminDashboard;
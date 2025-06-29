import React, {useState} from 'react';
import {motion} from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiShield, FiLock, FiEye, FiAlertTriangle, FiCheck, FiX,
  FiUsers, FiKey, FiActivity, FiSettings, FiRefreshCw
} = FiIcons;

const SecurityCenter = ({darkMode}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const securityTabs = [
    {id: 'overview', label: 'Security Overview', icon: FiShield},
    {id: 'access', label: 'Access Control', icon: FiLock},
    {id: 'audit', label: 'Audit Logs', icon: FiEye},
    {id: 'threats', label: 'Threat Detection', icon: FiAlertTriangle}
  ];

  const securityMetrics = [
    {
      title: 'Security Score',
      value: '94/100',
      icon: FiShield,
      color: 'from-green-500 to-green-600',
      status: 'excellent'
    },
    {
      title: 'Active Sessions',
      value: '23',
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600',
      status: 'normal'
    },
    {
      title: 'Failed Logins',
      value: '2',
      icon: FiX,
      color: 'from-yellow-500 to-yellow-600',
      status: 'low'
    },
    {
      title: 'API Calls',
      value: '1,247',
      icon: FiKey,
      color: 'from-purple-500 to-purple-600',
      status: 'normal'
    }
  ];

  const auditLogs = [
    {
      id: '1',
      action: 'User Login',
      user: 'admin@mediverse.ai',
      timestamp: '2024-01-15 14:30:22',
      ipAddress: '192.168.1.100',
      status: 'success',
      details: 'Successful admin login'
    },
    {
      id: '2',
      action: 'Dashboard Created',
      user: 'sarah.johnson@mediverse.ai',
      timestamp: '2024-01-15 14:25:15',
      ipAddress: '192.168.1.101',
      status: 'success',
      details: 'Created patient analytics dashboard'
    },
    {
      id: '3',
      action: 'Failed Login Attempt',
      user: 'unknown@example.com',
      timestamp: '2024-01-15 14:20:08',
      ipAddress: '203.45.67.89',
      status: 'failed',
      details: 'Invalid credentials provided'
    },
    {
      id: '4',
      action: 'API Token Generated',
      user: 'michael.chen@mediverse.ai',
      timestamp: '2024-01-15 14:15:33',
      ipAddress: '192.168.1.102',
      status: 'success',
      details: 'Generated new API token for analytics'
    },
    {
      id: '5',
      action: 'Data Export',
      user: 'emily.rodriguez@mediverse.ai',
      timestamp: '2024-01-15 14:10:45',
      ipAddress: '192.168.1.103',
      status: 'success',
      details: 'Exported patient report data'
    }
  ];

  const threatAlerts = [
    {
      id: '1',
      type: 'Suspicious Login',
      severity: 'medium',
      description: 'Multiple failed login attempts from IP 203.45.67.89',
      timestamp: '15 minutes ago',
      status: 'investigating'
    },
    {
      id: '2',
      type: 'Rate Limit Exceeded',
      severity: 'low',
      description: 'API rate limit exceeded for token mv_api_xyz123',
      timestamp: '1 hour ago',
      status: 'resolved'
    },
    {
      id: '3',
      type: 'Unusual Access Pattern',
      severity: 'high',
      description: 'Admin access from new geographic location',
      timestamp: '2 hours ago',
      status: 'resolved'
    }
  ];

  const accessControls = [
    {
      id: '1',
      resource: 'Patient Data',
      permissions: ['read', 'write', 'delete'],
      roles: ['admin', 'doctor'],
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      resource: 'Analytics Dashboard',
      permissions: ['read', 'write'],
      roles: ['admin', 'analyst'],
      lastModified: '2024-01-14'
    },
    {
      id: '3',
      resource: 'Reports',
      permissions: ['read', 'export'],
      roles: ['admin', 'doctor', 'analyst'],
      lastModified: '2024-01-13'
    },
    {
      id: '4',
      resource: 'System Settings',
      permissions: ['read', 'write'],
      roles: ['admin'],
      lastModified: '2024-01-12'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      className="space-y-6"
    >
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiShield} className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Security Center</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Comprehensive security monitoring and access control
              </p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <SafeIcon icon={FiRefreshCw} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mt-6">
          {securityTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
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

      {/* Security Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Security Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: index * 0.1}}
                className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                    <SafeIcon icon={metric.icon} className="text-white text-xl" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    metric.status === 'excellent' ? 'bg-green-100 text-green-800' :
                    metric.status === 'normal' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {metric.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {metric.title}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Security Status */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
              <h4 className="font-semibold mb-4">Security Checks</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Two-Factor Authentication</span>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiCheck} className="text-green-500" />
                    <span className="text-sm text-green-600">Enabled</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SSL Certificate</span>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiCheck} className="text-green-500" />
                    <span className="text-sm text-green-600">Valid</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Encryption</span>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiCheck} className="text-green-500" />
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Backup Systems</span>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiCheck} className="text-green-500" />
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Firewall Protection</span>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiCheck} className="text-green-500" />
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
              <h4 className="font-semibold mb-4">Recent Threats</h4>
              <div className="space-y-3">
                {threatAlerts.slice(0, 3).map(threat => (
                  <div key={threat.id} className={`p-3 rounded-lg border ${
                    darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-sm">{threat.type}</h5>
                      <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(threat.severity)}`}>
                        {threat.severity}
                      </span>
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                      {threat.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{threat.timestamp}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        threat.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {threat.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Access Control */}
      {activeTab === 'access' && (
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <h4 className="font-semibold mb-4">Access Control Policies</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roles
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Modified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-600' : 'divide-gray-200'}`}>
                {accessControls.map(control => (
                  <tr key={control.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium">{control.resource}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {control.permissions.map(permission => (
                          <span
                            key={permission}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {control.roles.map(role => (
                          <span
                            key={role}
                            className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {control.lastModified}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">
                        <SafeIcon icon={FiSettings} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Audit Logs */}
      {activeTab === 'audit' && (
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <h4 className="font-semibold mb-4">Audit Logs</h4>
          <div className="space-y-3">
            {auditLogs.map(log => (
              <div
                key={log.id}
                className={`p-4 rounded-lg border ${
                  darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{log.action}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{log.timestamp}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>User: {log.user}</span>
                  <span>IP: {log.ipAddress}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{log.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Threat Detection */}
      {activeTab === 'threats' && (
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <h4 className="font-semibold mb-4">Threat Detection & Alerts</h4>
          <div className="space-y-4">
            {threatAlerts.map(threat => (
              <div
                key={threat.id}
                className={`p-4 rounded-lg border ${
                  darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <SafeIcon 
                      icon={FiAlertTriangle} 
                      className={`text-xl ${
                        threat.severity === 'high' ? 'text-red-500' :
                        threat.severity === 'medium' ? 'text-yellow-500' :
                        'text-green-500'
                      }`} 
                    />
                    <h5 className="font-medium">{threat.type}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(threat.severity)}`}>
                      {threat.severity} severity
                    </span>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    threat.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {threat.status}
                  </span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  {threat.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{threat.timestamp}</span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      Investigate
                    </button>
                    {threat.status !== 'resolved' && (
                      <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SecurityCenter;